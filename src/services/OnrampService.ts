import { AppDataSource } from "../data-source";
import { Onramp } from "../models/Onramp";
import { Wallet } from "../models/Wallet";
import { YellowCard } from "../helpers/YellowCard"; // Adjust the import path as needed
import type {
  PaymentCollectionForm,
  SinglePaymentCollectionResponse,
  AcceptPaymentCollectionResponse,
  DenyPaymentCollectionResponse,
  CancelPaymentCollectionResponse,
  RefundPaymentCollectionResponse,
  WebhookResponse,
  PaymentChannel,
  PaymentNetwork,
  ExchangeRate,
  AccountDetails,
} from "../types/YellowCard";

export class OnrampService {
  private yellowCard: YellowCard;
  private onrampRepository = AppDataSource.getRepository(Onramp);
  private walletRepository = AppDataSource.getRepository(Wallet);

  constructor() {
    this.yellowCard = new YellowCard(); // Initialize the YellowCard helper
  }

  /**
   * Retrieves the list of supported countries for deposits.
   * @returns A promise that resolves to an array of supported countries.
   */
  async getSupportedCountriesForDeposit(): Promise<
    { country: string; code: string; currency: string; supported_methods: string[] }[]
  > {
    const supportedCountries = await this.yellowCard.getSupportedCountries("deposit");

    return supportedCountries.map((country) => ({
      country: country.country,
      code: country.code,
      currency: country.currency,
      supported_methods: country.supported_methods,
    }));
  }

  /**
   * Get available payment channels for a specific country.
   * @param country_code - The two-letter country code (e.g., "NG").
   * @returns A promise that resolves to an array of PaymentChannel objects.
   */
  async getChannels(country_code: string): Promise<PaymentChannel[]> {
    return this.yellowCard.getChannels(country_code);
  }

  /**
   * Get available payment networks for a specific country.
   * @param country_code - The two-letter country code (e.g., "NG").
   * @returns A promise that resolves to an array of PaymentNetwork objects.
   */
  async getNetworks(country_code: string): Promise<PaymentNetwork[]> {
    return this.yellowCard.getNetworks(country_code);
  }

  /**
   * Get the base exchange rate for a specific currency.
   * @param currency - The three-letter currency code (e.g., "NGN").
   * @returns A promise that resolves to an ExchangeRate object.
   */
  async getBaseExchangeRate(currency: string): Promise<ExchangeRate> {
    return this.yellowCard.getBaseExchangeRate(currency);
  }

  /**
   * Get the global account details.
   * @returns A promise that resolves to an AccountDetails object.
   */
  async getGlobalAccountDetails(): Promise<AccountDetails> {
    return this.yellowCard.getGlobalAccountDetails();
  }

  /**
   * Submit a payment collection.
   * @param data - The payment collection form data.
   * @returns A promise that resolves to a SinglePaymentCollectionResponse object.
   */
   async submitPaymentCollection(
     data: PaymentCollectionForm,
     wallet_id: number,
     user_id: number,
   ): Promise<SinglePaymentCollectionResponse> {
     // Step 1: Submit the payment collection via YellowCard API
     const response = await this.yellowCard.submitPaymentCollection(data);
   
     // Step 2: Save the transaction to the database
     const onrampTransaction = new Onramp();
     onrampTransaction.uuid = response.id; // Use the transaction ID from the API response
     onrampTransaction.wallet_id = wallet_id; // Pass wallet_id separately
     onrampTransaction.user_id = user_id; // Pass user_id separately
     onrampTransaction.amount = data.amount?.toString() || "0";
     onrampTransaction.balance_after = (
       parseFloat(data.amount?.toString() || "0") + parseFloat(response.convertedAmount?.toString() || "0")
     ).toString();
     onrampTransaction.payment_reference = response.sequenceId;
     onrampTransaction.payment_channel = response.channelId;
     onrampTransaction.description = `Deposit via ${response.channelId}`;
     onrampTransaction.currency = response.currency;
     onrampTransaction.status = response.status;
   
     await this.onrampRepository.save(onrampTransaction);
   
     // Step 3: Update the wallet balance
     const wallet = await this.walletRepository.findOne({
       where: { id: wallet_id },
     });
   
     if (!wallet) {
       throw new Error("Wallet not found.");
     }
   
     wallet.total_balance = (
       parseFloat(wallet.total_balance) + parseFloat(data.amount?.toString() || "0")
     ).toString();
     await this.walletRepository.save(wallet);
   
     return response;
   }

  /**
   * Accept a collection request.
   * @param id - The ID of the collection request.
   * @returns A promise that resolves to an AcceptPaymentCollectionResponse object.
   */
  async acceptCollectionRequest(
    id: string,
  ): Promise<AcceptPaymentCollectionResponse> {
    return this.yellowCard.acceptCollectionRequest(id);
  }

  /**
   * Deny a collection request.
   * @param id - The ID of the collection request.
   * @returns A promise that resolves to a DenyPaymentCollectionResponse object.
   */
  async denyCollectionRequest(
    id: string,
  ): Promise<DenyPaymentCollectionResponse> {
    return this.yellowCard.denyCollectionRequest(id);
  }

  /**
   * Cancel a collection request.
   * @param id - The ID of the collection request.
   * @returns A promise that resolves to a CancelPaymentCollectionResponse object.
   */
  async cancelCollectionRequest(
    id: string,
  ): Promise<CancelPaymentCollectionResponse> {
    return this.yellowCard.cancelCollectionRequest(id);
  }

  /**
   * Refund a collection request.
   * @param id - The ID of the collection request.
   * @returns A promise that resolves to a RefundPaymentCollectionResponse object.
   */
  async refundCollectionRequest(
    id: string,
  ): Promise<RefundPaymentCollectionResponse> {
    return this.yellowCard.refundCollectionRequest(id);
  }

  /**
   * Get a single collection request.
   * @param id - The ID of the collection request.
   * @returns A promise that resolves to a SinglePaymentCollectionResponse object.
   */
  async getSingleCollectionRequest(
    id: string,
  ): Promise<SinglePaymentCollectionResponse> {
    return this.yellowCard.getSingleCollectionRequest(id);
  }

  /**
   * Create a webhook.
   * @param data - An object containing the URL, state, and active status of the webhook.
   * @returns A promise that resolves to a WebhookResponse object.
   */
  async createWebhook(data: {
    url: string;
    state: string;
    active: boolean;
  }): Promise<WebhookResponse> {
    return this.yellowCard.createWebhook(data);
  }
}