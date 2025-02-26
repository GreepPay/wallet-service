import { Wallet } from "../models/Wallet";
import { AppDataSource } from "../data-source";
import { YellowCard } from "../helpers/YellowCard"; 
import { Offramp } from "../models/Offramp";

import type {
  PaymentRequestForm,
  PaymentRequestResponse,
  PaymentRequestStateResponse,
  SinglePaymentRequestResponse,
  SingleSettlement,
  CryptoSettlementForm,
  WebhookResponse,
  ResolveBankAccountResponse,
} from "../types/YellowCard";

export class OfframpService  {
  private yellowCard: YellowCard;
  private offrampRepository = AppDataSource.getRepository(Offramp);
    private walletRepository = AppDataSource.getRepository(Wallet);

  constructor(yellowCard: YellowCard) {
    this.yellowCard = yellowCard;
  }

  /**
   * Retrieves the list of supported countries for withdrawals.
   * @returns A promise that resolves to an array of supported countries.
   */
  public async getSupportedCountriesForWithdrawal() {
    return this.yellowCard.getSupportedCountries("withdraw");
  }

  /**
   * Resolve bank account details.
   * @param data An object containing the account number and network ID.
   * @returns A promise that resolves to a ResolveBankAccountResponse object.
   */
  public async resolveBankAccount(data: {
    accountNumber: string;
    networkId: string;
  }): Promise<ResolveBankAccountResponse> {
    return this.yellowCard.resolveBankAccount(data);
  }

  /**
   * Submit a payment request.
   * @param data The payment request form data.
   * @returns A promise that resolves to a PaymentRequestResponse object.
   */
  public  async submitPaymentRequest(
    data: PaymentRequestForm,
    wallet_id: number,
    user_id: number,
  ): Promise<PaymentRequestResponse> {
    // Step 1: Submit the payment request via YellowCard API
    const response = await this.yellowCard.submitPaymentRequest(data);
  
    // Step 2: Save the transaction to the database
    const offrampTransaction = new Offramp();
    offrampTransaction.uuid = response.id; // Use the transaction ID from the API response
    offrampTransaction.wallet_id = wallet_id; // Pass wallet_id separately
    offrampTransaction.user_id = user_id; // Pass user_id separately
    offrampTransaction.amount = data.amount?.toString() || "0";
    offrampTransaction.balance_after = (
      parseFloat(data.amount?.toString() || "0") - parseFloat(response.convertedAmount?.toString() || "0")
    ).toString();
    offrampTransaction.payment_reference = response.sequenceId;
    offrampTransaction.payment_channel = response.channelId;
    offrampTransaction.description = `Withdrawal via ${response.channelId}`;
    offrampTransaction.currency = response.currency;
    offrampTransaction.status = response.status;
  
    await this.offrampRepository.save(offrampTransaction);
  
    // Step 3: Update the wallet balance
    const wallet = await this.walletRepository.findOne({
      where: { id: wallet_id },
    });
  
    if (!wallet) {
      throw new Error("Wallet not found.");
    }
  
    wallet.total_balance = (
      parseFloat(wallet.total_balance) - parseFloat(data.amount?.toString() || "0")
    ).toString();
    await this.walletRepository.save(wallet);
  
    return response;
  }

  /**
   * Accept a payment request.
   * @param id The ID of the payment request.
   * @returns A promise that resolves to a PaymentRequestStateResponse object.
   */
  public async acceptPaymentRequest(
    id: string,
  ): Promise<PaymentRequestStateResponse> {
    return this.yellowCard.acceptPaymentRequest(id);
  }

  /**
   * Deny a payment request.
   * @param id The ID of the payment request.
   * @returns A promise that resolves to a PaymentRequestStateResponse object.
   */
  public async denyPaymentRequest(
    id: string,
  ): Promise<PaymentRequestStateResponse> {
    return this.yellowCard.denyPaymentRequest(id);
  }

  /**
   * Get a single payment request.
   * @param id The ID of the payment request.
   * @returns A promise that resolves to a SinglePaymentRequestResponse object.
   */
  public async getPaymentRequest(
    id: string,
  ): Promise<SinglePaymentRequestResponse> {
    return this.yellowCard.getPaymentRequest(id);
  }

  /**
   * Create a settlement.
   * @param data The crypto settlement form data.
   * @returns A promise that resolves to a SingleSettlement object.
   */
  public async createSettlement(
    data: CryptoSettlementForm,
  ): Promise<SingleSettlement> {
    return this.yellowCard.createSettlement(data);
  }

  /**
   * Get a settlement by sequence ID.
   * @param sequenceId The sequence ID of the settlement.
   * @returns A promise that resolves to a SingleSettlement object.
   */
  public async getSettlement(sequenceId: string): Promise<SingleSettlement> {
    return this.yellowCard.getSettlement(sequenceId);
  }

  /**
   * Update a webhook.
   * @param data An object containing the ID, URL, state, and active status of the webhook.
   * @returns A promise that resolves to a WebhookResponse object.
   */
  public async updateWebhook(data: {
    id: string;
    url: string;
    state: string;
    active: boolean;
  }): Promise<WebhookResponse> {
    return this.yellowCard.updateWebhook(data);
  }

  /**
   * Delete a webhook.
   * @param id The ID of the webhook to delete.
   * @returns A promise that resolves to a WebhookResponse object.
   */
  public async deleteWebhook(id: string): Promise<WebhookResponse> {
    return this.yellowCard.deleteWebhook(id);
  }
}