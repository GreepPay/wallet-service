import { TransactionController } from "../controllers/TransactionController";
import router, { type BunRequest } from "./router";

const APP_VERSION = "v1";

/**
 * @swagger
 * /v1/transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Create a new transaction
 *     description: Creates a new transaction (credit or debit)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               dr_or_cr:
 *                 type: string
 *           use std::str::FromStr;
 
 use anyhow::Error;
 use reqwest::Response;
 use stellar_base::xdr::XDRSerialize;
 use stellar_base::{
     amount::Stroops,
     operations::{
         ChangeTrustOperationBuilder, CreateAccountOperationBuilder, PaymentOperationBuilder,
     },
     time_bounds::TimeBounds,
     Asset, KeyPair, Network, PublicKey, Transaction,
 };
 use stellar_sdk::{Keypair, Server};
 
 /// Represents a newly created Stellar account with its public and secret keys
 pub struct NewStellarAccount {
     /// The public key of the Stellar account
     pub public_key: String,
     /// The secret key (private key) of the Stellar account
     pub secret_key: String,
 }
 
 /// Handles interactions with the Stellar blockchain network
 pub struct StellarChain {
     pub client: Server,
     network: Network,
     server_url: String,
 }
 
 impl StellarChain {
     /// Creates a new StellarChain instance
     ///
     /// # Arguments
     /// * `server_url` - The URL of the Stellar Horizon server
     /// * `network` - The Stellar network to connect to (testnet or public)
     pub fn new(server_url: String, network: Network) -> Self {
         Self {
             client: Server::new(server_url.clone(), None).unwrap(),
             network,
             server_url,
         }
     }
 
     /// Creates a new Stellar account with randomly generated keys
     ///
     /// # Returns
     /// * `Result<NewStellarAccount, Error>` - The newly created account details or an error
     pub fn create_new_account(&self) -> Result<NewStellarAccount, Error> {
         // Generate a random key pair
         let mut new_keypair = Keypair::random().unwrap();
         let secret_key = new_keypair.secret_key().unwrap();
         let public_key = new_keypair.public_key();
 
         Ok(NewStellarAccount {
             public_key: public_key.to_string(),
             secret_key: secret_key.to_string(),
         })
     }
 
     /// Activates a Stellar account by funding it with the minimum balance
     ///
     /// # Arguments
     /// * `keypair` - The keypair of the account to activate
     ///
     /// # Returns
     /// * `Result<Response, Error>` - The transaction response or an error
     pub async fn activate_account(
         &self,
         keypair: Keypair,
     ) -> Result<(Response, PublicKey, PublicKey, Stroops), Error> {
         let new_account =
             stellar_base::PublicKey::from_account_id(keypair.public_key().as_str()).unwrap();
 
         let issuer_secret_key = std::env::var("ISSUER_SECRET_KEY").unwrap();
 
         let funding_keypair = Keypair::from_secret_key(&issuer_secret_key).unwrap();
 
         let funding_account =
             stellar_base::PublicKey::from_account_id(funding_keypair.public_key().as_str())
                 .unwrap();
 
         let time_bounds = TimeBounds::always_valid();
 
         let create_account_operation_builder = CreateAccountOperationBuilder::new();
 
         let amount = Stroops::new(10000000);
 
         // Create the create account operation sending 1 XLM to the new account
         let create_account_operation = create_account_operation_builder
             .with_source_account(funding_account.clone())
             .with_destination(new_account.clone())
             .with_starting_balance(amount.clone())?
             .build()?;
 
         let funding_account_details = self
             .client
             .load_account(&funding_keypair.public_key())
             .unwrap();
 
         let mut transaction = Transaction::builder(
             funding_account.clone(),
             funding_account_details.sequence_number().parse::<i64>()? + 1,
             Stroops::new(100),
         )
         .add_operation(create_account_operation)
         .with_time_bounds(time_bounds)
         .into_transaction()?;
 
         // Sign the transaction
         let funding_keypair = KeyPair::from_str(&issuer_secret_key).unwrap();
         transaction.sign(&funding_keypair, &self.network)?;
 
         let base64_transaction = transaction.into_envelope().xdr_base64()?;
 
         // Submit the transaction to Horizon testnet using reqwest
         let response = reqwest::Client::new()
             .post(self.server_url.clone() + "/transactions")
             .header("Accept", "application/json")
             .form(&[("tx", base64_transaction)])
             .send()
             .await?;
 
         Ok((response, funding_account, new_account, amount))
     }
 
     /// Establishes a trustline for a specific asset on behalf of an account
     ///
     /// # Arguments
     /// * `keypair` - The keypair of the account establishing the trustline
     /// * `asset` - The asset to establish the trustline for
     ///
     /// # Returns
     /// * `Result<Response, Error>` - The transaction response or an error
     pub async fn establish_trustline_for_asset(
         &self,
         keypair: Keypair,
         asset: Asset,
     ) -> Result<Response, Error> {
         let receiver_account =
             stellar_base::PublicKey::from_account_id(keypair.public_key().as_str()).unwrap();
 
         let time_bounds = TimeBounds::always_valid();
 
         let trust_operation_builder = ChangeTrustOperationBuilder::new();
 
         //  If not credit asset throw error
         if !matches!(asset, Asset::Credit(_)) {
             return Err(anyhow::anyhow!("Asset is not a credit asset"));
         }
 
         let trust_operation = trust_operation_builder
             .with_source_account(receiver_account.clone())
             .with_asset(asset)
             .build()?;
 
         let receiver_account_details = self.client.load_account(&keypair.public_key())?;
 
         let mut trust_transaction = Transaction::builder(
             receiver_account,
             receiver_account_details.sequence_number().parse::<i64>()? + 1, // Convert to i64
             Stroops::new(100),
         )
         .add_operation(trust_operation)
         .with_time_bounds(time_bounds)
         .into_transaction()?;
 
         let mut keypair_clone = keypair.clone();
 
         let receiver_key = KeyPair::from_str(&keypair_clone.secret_key().unwrap())?;
         trust_transaction.sign(&receiver_key, &Network::new_test())?;
 
         let base64_transaction = trust_transaction.into_envelope().xdr_base64()?;
 
         // Submit the transaction to Horizon testnet using reqwest
         let response = reqwest::Client::new()
             .post(self.server_url.clone() + "/transactions")
             .header("Accept", "application/json")
             .form(&[("tx", base64_transaction)])
             .send()
             .await?;
 
         Ok(response)
     }
 
     /// Sends an asset from one account to another
     ///
     /// # Arguments
     /// * `sender_keypair` - The keypair of the sending account
     /// * `receiver_pub_key` - The public key of the receiving account
     /// * `asset` - The asset to send
     /// * `amount` - The amount to send (will be converted to stroops)
     ///
     /// # Returns
     /// * `Result<Response, Error>` - The transaction response or an error
     pub async fn send_asset(
         &self,
         sender_keypair: Keypair,
         receiver_pub_key: String,
         asset: Asset,
         amount: u64,
     ) -> Result<Response, Error> {
         let sender_account =
             stellar_base::PublicKey::from_account_id(sender_keypair.public_key().as_str()).unwrap();
 
         let receiver_account =
             stellar_base::PublicKey::from_account_id(receiver_pub_key.as_str()).unwrap();
 
         let time_bounds = TimeBounds::always_valid();
 
         let payment_operation_builder = PaymentOperationBuilder::new();
 
         // Convert amount to stroops
         let amount_in_stroops = Stroops::new((amount * 1000000000).try_into().unwrap());
 
         let payment_operation = payment_operation_builder
             .with_source_account(sender_account.clone())
             .with_destination(receiver_account)
             .with_asset(asset)
             .with_amount(amount_in_stroops)?
             .build()?;
 
         let sender_account_details = self
             .client
             .load_account(&sender_keypair.public_key())
             .unwrap();
 
         let mut transaction = Transaction::builder(
             sender_account,
             sender_account_details.sequence_number().parse::<i64>()? + 1,
             Stroops::new(100),
         )
         .add_operation(payment_operation)
         .with_time_bounds(time_bounds)
         .into_transaction()?;
 
         // Sign the transaction
         let mut sender_keypair_clone = sender_keypair.clone();
         let sender_key = KeyPair::from_str(&sender_keypair_clone.secret_key().unwrap())?;
         transaction.sign(&sender_key, &Network::new_test())?;
 
         let base64_transaction = transaction.into_envelope().xdr_base64()?;
 
         // Submit the transaction to Horizon testnet using reqwest
         let client = reqwest::Client::new();
         let response = client
             .post(self.server_url.clone() + "/transactions")
             .header("Accept", "application/json")
             .form(&[("tx", base64_transaction)])
             .send()
             .await?;
 
         Ok(response)
     }
 }    currency:
 *                 type: string
 *               wallet_id:
 *                 type: number
 *               user_id:
 *                 type: number
 *               amount:
 *                 type: string
 *               wallet_balance:
 *                 type: string
 *               charge_id:
 *                 type: string
 *               chargeable_type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               charges:
 *                 type: string
 *               reference:
 *                 type: string
 *               extra_data:
 *                 type: string
 *               gateway:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid input data
 */
router.add(
  "POST",
  `/${APP_VERSION}/transactions`,
  async (request: BunRequest) => {
    const result = await new TransactionController().createTransaction(request);
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/transactions/{id}/status:
 *   POST:
 *     tags:
 *       - Transactions
 *     summary: Update transaction status
 *     description: Updates the status of a transaction (e.g., default, pending, successful)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction status updated successfully
 *       404:
 *         description: Transaction not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/transactions/:id/status`,
  async (request: BunRequest) => {
    const result = await new TransactionController().updateTransactionStatus(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);

/**
 * @swagger
 * /v1/transactions/{id}/soft-delete:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Soft delete a transaction
 *     description: Soft deletes a transaction by marking it as deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to soft delete
 *     responses:
 *       200:
 *         description: Transaction soft deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.add(
  "POST",
  `/${APP_VERSION}/transactions/:id/soft-delete`,
  async (request: BunRequest) => {
    const result = await new TransactionController().softDeleteTransaction(
      request,
    );
    return new Response(JSON.stringify(result.body), {
      headers: { "Content-Type": "application/json" },
      status: result.statusCode,
    });
  },
);
