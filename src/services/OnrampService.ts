import { AppDataSource } from "../data-source";
import { Onramp } from "../models/Onramp";
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
   ): Promise<SinglePaymentCollectionResponse> {
     try {
       // Step 1: Validate recipient fields based on customerType
       this.validateRecipient(data);
   
       // Step 2: Submit the payment collection via YellowCard API
       const response = await this.yellowCard.submitPaymentCollection(data);
   
       // Step 3: Save the transaction to the database
       const onrampTransaction = this.createOnrampTransaction(data, response);
       await this.onrampRepository.save(onrampTransaction);
   
       return response;
     } catch (error) {
       console.error("Error in submitPaymentCollection:", error);
       throw new Error(`Failed to submit payment collection: ${String(error)}`);
     }
   }
   
   /**
    * Validates the recipient object based on the customerType.
    * Throws an error if required fields are missing.
    */
   private validateRecipient(data: PaymentCollectionForm): void {
     const recipient = data.recipient;
   
     if (data.customerType === "institution") {
       if (!recipient?.businessId || !recipient?.businessName) {
         throw new Error("Business ID and Business Name are required for institution customer type.");
       }
     } else if (data.customerType === "retail") {
       if (
         !recipient?.name ||
         !recipient?.phone ||
         !recipient?.email ||
         !recipient?.country ||
         !recipient?.address ||
         !recipient?.dob ||
         !recipient?.idNumber ||
         !recipient?.idType
       ) {
         throw new Error(
           "All retail recipient fields (name, phone, email, country, address, dob, idNumber, idType) are required."
         );
       }
     }
   }
   
   /**
    * Creates an Onramp transaction object from the API response and input data.
    */
   private createOnrampTransaction(
     data: PaymentCollectionForm,
     response: SinglePaymentCollectionResponse
   ): Onramp {
     const onrampTransaction = new Onramp();
   
     // Assign top-level fields
     onrampTransaction.uuid = response.id; // Use the transaction ID from the API response
     onrampTransaction.localAmount = data.localAmount?.toString() ?? "0";
     onrampTransaction.payment_reference = response.sequenceId;
     onrampTransaction.payment_channel = response.channelId;
     onrampTransaction.description = `Deposit via ${response.channelId}`;
     onrampTransaction.currency = response.currency;
     onrampTransaction.status = response.status;
   
     // Assign recipient fields
     const recipient = data.recipient;
     if (recipient) {
       onrampTransaction.recipientName = recipient.name ?? "";
       onrampTransaction.recipientCountry = recipient.country ?? "";
       onrampTransaction.recipientAddress = recipient.address ?? "";
       onrampTransaction.recipientDob = recipient.dob ?? "";
       onrampTransaction.recipientEmail = recipient.email ?? "";
       onrampTransaction.recipientIdNumber = recipient.idNumber ?? "";
       onrampTransaction.recipientIdType = recipient.idType ?? "";
       onrampTransaction.recipientAdditionalIdType = recipient.additionalIdType ?? "";
       onrampTransaction.recipientAdditionalIdNumber = recipient.additionalIdNumber ?? "";
       onrampTransaction.recipientPhone = recipient.phone ?? "";
       onrampTransaction.recipientBusinessId = recipient.businessId ?? "";
       onrampTransaction.recipientBusinessName = recipient.businessName ?? "";
     }
   
     return onrampTransaction;
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