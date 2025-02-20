import axios, { AxiosError, type AxiosResponse } from "axios";
import dotenv from "dotenv";
import crypto from "crypto-js";
import type {
  PaymentRequestStateResponse,
  AccountDetails,
  ExchangeRate,
  PaymentChannel,
  PaymentNetwork,
  PaymentRequestForm,
  PaymentRequestResponse,
  ResolveBankAccountResponse,
  SinglePaymentRequestResponse,
  PaymentCollectionForm,
  SinglePaymentCollectionResponse,
  AcceptPaymentCollectionResponse,
  DenyPaymentCollectionResponse,
  CancelPaymentCollectionResponse,
  RefundPaymentCollectionResponse,
  WebhookResponse,
  SingleSettlement,
  CryptoSettlementForm,
} from "../types/YellowCard";

export class YellowCard {
  private apiKey: string;
  private baseUrl: string;
  private secretKey: string;

  constructor() {
    dotenv.config();

    this.apiKey = process.env.YELLOW_CARD_API_KEY || "";
    this.baseUrl = process.env.YELLOW_CARD_BASE_URL || "";
    this.secretKey = process.env.YELLOW_CARD_SECRET_KEY || "";
  }

  /**
   * Handles the HTTP requests to the Yellow Card API.
   *
   * @param type The HTTP method (GET, POST, PUT, DELETE).
   * @param path The endpoint path.
   * @param request The request body (optional).
   * @returns A promise with the response data.
   * @throws Error if the request fails.
   */
  private async handleRequest(
    type: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    request?: any,
  ): Promise<any> {
    const currentTime = new Date().toISOString();
    const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, this.secretKey);

    let pathWithoutQueryParams = path.split("?")[0];

    hmac.update(currentTime);
    hmac.update(pathWithoutQueryParams);
    hmac.update(type);

    if (request) {
      let bodyHmac = crypto
        .SHA256(JSON.stringify(request))
        .toString(crypto.enc.Base64);
      hmac.update(bodyHmac);
    }

    const hash = hmac.finalize();
    const signature = crypto.enc.Base64.stringify(hash);

    const httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        Authorization: `YcHmacV1 ${this.apiKey}:${signature}`,
        "X-YC-Timestamp": currentTime,
      },
    });

    try {
      const response = await httpClient[
        type.toLowerCase() as "get" | "post" | "put" | "delete"
      ](path, request);

      if (response.status >= 200 && response.status < 300) {
        // Check for successful status codes (2xx)
        return response.data;
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data && error.response.data) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from the server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }

      throw new Error(`Request to ${path} failed: ${errorMessage}`);
    }
  }

  /**
   * Retrieves the list of supported countries for deposits or withdrawals.
   * @param fund_flow - 'deposit' or 'withdraw', determines the list of countries returned. Defaults to 'deposit'.
   * @returns A promise that resolves to an array of supported countries.
   */
  public getSupportedCountries(
    fund_flow: "deposit" | "withdraw" = "deposit",
  ): Promise<
    {
      country: string;
      code: string;
      currency: string;
      supported_methods: string[];
    }[]
  > {
    const supportedDepositCountries = [
      {
        country: "Botswana",
        code: "BW",
        currency: "BWP",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Cameroon",
        code: "CM",
        currency: "XAF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Congo Brazzaville",
        code: "CG",
        currency: "XAF",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Gabon",
        code: "GA",
        currency: "XAF",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Ghana",
        code: "GH",
        currency: "GHS",
        supported_methods: [],
      },
      {
        country: "Kenya",
        code: "KE",
        currency: "KES",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Malawi",
        code: "MW",
        currency: "MWK",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
      {
        country: "Nigeria",
        code: "NG",
        currency: "NGN",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Rwanda",
        code: "RW",
        currency: "RWF",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "South Africa",
        code: "ZA",
        currency: "ZAR",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Tanzania",
        code: "TZ",
        currency: "TZS",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
      {
        country: "Uganda",
        code: "UG",
        currency: "UGX",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Zambia",
        code: "ZM",
        currency: "ZMW",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
    ];

    const supportedWithdrawalCountries = [
      {
        country: "Botswana",
        code: "BW",
        currency: "BWP",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Cameroon",
        code: "CM",
        currency: "XAF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Congo Brazzaville",
        code: "CG",
        currency: "XAF",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "DR Congo",
        code: "CD",
        currency: "CDF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Gabon",
        code: "GA",
        currency: "XAF",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Ghana",
        code: "GH",
        currency: "GHS",
        supported_methods: [],
      },
      {
        country: "Ivory Coast",
        code: "CI",
        currency: "XOF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Kenya",
        code: "KE",
        currency: "KES",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
      {
        country: "Malawi",
        code: "MW",
        currency: "MWK",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
      {
        country: "Nigeria",
        code: "NG",
        currency: "NGN",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Rwanda",
        code: "RW",
        currency: "RWF",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Senegal",
        code: "SN",
        currency: "XOF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "South Africa",
        code: "ZA",
        currency: "ZAR",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Tanzania",
        code: "TZ",
        currency: "TZS",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
      {
        country: "Uganda",
        code: "UG",
        currency: "UGX",
        supported_methods: ["bank_transfer"],
      },
      {
        country: "Zambia",
        code: "ZM",
        currency: "ZMW",
        supported_methods: ["bank_transfer", "mobile_money"],
      },
      {
        country: "Mali",
        code: "ML",
        currency: "XOF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Togo",
        code: "TG",
        currency: "XOF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Burkina Faso",
        code: "BF",
        currency: "XOF",
        supported_methods: ["mobile_money"],
      },
      {
        country: "Benin",
        code: "BJ",
        currency: "XOF",
        supported_methods: ["mobile_money"],
      },
    ];

    if (fund_flow === "withdraw") {
      return Promise.resolve(supportedWithdrawalCountries);
    }
    return Promise.resolve(supportedDepositCountries);
  }

  /**
   * Get available payment channels for a specific country.
   * @param country_code The two-letter country code (e.g., "NG").
   * @returns A promise that resolves to an array of PaymentChannel objects.
   */
  public async getChannels(country_code: string): Promise<PaymentChannel[]> {
    const response: PaymentChannel[] = await this.handleRequest(
      "GET",
      `/business/channels?country=${country_code}`,
    );
    return Promise.resolve(response);
  }

  /**
   * Get available payment networks for a specific country.
   * @param country_code The two-letter country code (e.g., "NG").
   * @returns A promise that resolves to an array of PaymentNetwork objects.
   */
  public async getNetworks(country_code: string): Promise<PaymentNetwork[]> {
    const response: PaymentNetwork[] = await this.handleRequest(
      "GET",
      `/business/networks?country=${country_code}`,
    );

    return Promise.resolve(response);
  }

  /**
   * Get the base exchange rate for a specific currency.
   * @param currency The three-letter currency code (e.g., "NGN").
   * @returns A promise that resolves to an ExchangeRate object.
   */
  public async getBaseExchangeRate(currency: string): Promise<ExchangeRate> {
    const response: ExchangeRate = await this.handleRequest(
      "GET",
      `/business/rates?currency=${currency}`,
    );
    return Promise.resolve(response);
  }

  /**
   * Get the global account details.
   * @returns A promise that resolves to an AccountDetails object.
   */
  public async getGlobalAccountDetails(): Promise<AccountDetails> {
    const response: AccountDetails = await this.handleRequest(
      "GET",
      `/business/account`,
    );
    return Promise.resolve(response);
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
    const response: ResolveBankAccountResponse = await this.handleRequest(
      "POST",
      `/business/details/bank`,
      data,
    );

    return Promise.resolve(response);
  }

  /**
   * Submit a payment request.
   * @param data The payment request form data.
   * @returns A promise that resolves to a PaymentRequestResponse object.
   */
  public async submitPaymentRequest(
    data: PaymentRequestForm,
  ): Promise<PaymentRequestResponse> {
    const response: PaymentRequestResponse = await this.handleRequest(
      "POST",
      `/business/payments`,
      data,
    );

    return Promise.resolve(response);
  }

  /**
   * Accept a payment request.
   * @param id The ID of the payment request.
   * @returns A promise that resolves to a PaymentRequestStateResponse object.
   */
  public async acceptPaymentRequest(
    id: string,
  ): Promise<PaymentRequestStateResponse> {
    const response: PaymentRequestStateResponse = await this.handleRequest(
      "POST",
      `/business/payments/${id}/accept`,
    );

    return Promise.resolve(response);
  }

  /**
   * Deny a payment request.
   * @param id The ID of the payment request.
   * @returns A promise that resolves to a PaymentRequestStateResponse object.
   */
  public async denyPaymentRequest(
    id: string,
  ): Promise<PaymentRequestStateResponse> {
    const response: PaymentRequestStateResponse = await this.handleRequest(
      "POST",
      `/business/payments/${id}/deny`,
    );

    return Promise.resolve(response);
  }

  /**
   * Get a single payment request.
   * @param id The ID of the payment request.
   * @returns A promise that resolves to a SinglePaymentRequestResponse object.
   */
  public async getPaymentRequest(
    id: string,
  ): Promise<SinglePaymentRequestResponse> {
    const response: SinglePaymentRequestResponse = await this.handleRequest(
      "GET",
      `/business/payments/${id}`,
    );

    return Promise.resolve(response);
  }

  /**
   * Submit a payment collection.
   * @param data The payment collection form data.
   * @returns A promise that resolves to a SinglePaymentCollectionResponse object.
   */
  public async submitPaymentCollection(
    data: PaymentCollectionForm,
  ): Promise<SinglePaymentCollectionResponse> {
    const response: SinglePaymentCollectionResponse = await this.handleRequest(
      "POST",
      `/business/collections`,
      data,
    );

    return Promise.resolve(response);
  }

  /**
   * Accept a collection request.
   * @param id The ID of the collection request.
   * @returns A promise that resolves to an AcceptPaymentCollectionResponse object.
   */
  public async acceptCollectionRequest(
    id: string,
  ): Promise<AcceptPaymentCollectionResponse> {
    const response: AcceptPaymentCollectionResponse = await this.handleRequest(
      "POST",
      `/business/collections/${id}/accept`,
    );

    return Promise.resolve(response);
  }

  /**
   * Deny a collection request.
   * @param id The ID of the collection request.
   * @returns A promise that resolves to a DenyPaymentCollectionResponse object.
   */
  public async denyCollectionRequest(
    id: string,
  ): Promise<DenyPaymentCollectionResponse> {
    const response: DenyPaymentCollectionResponse = await this.handleRequest(
      "POST",
      `/business/collections/${id}/deny`,
    );

    return Promise.resolve(response);
  }

  /**
   * Cancel a collection request.
   * @param id The ID of the collection request.
   * @returns A promise that resolves to a CancelPaymentCollectionResponse object.
   */
  public async cancelCollectionRequest(
    id: string,
  ): Promise<CancelPaymentCollectionResponse> {
    const response: CancelPaymentCollectionResponse = await this.handleRequest(
      "POST",
      `/business/collections/${id}/cancel`,
    );

    return Promise.resolve(response);
  }

  /**
   * Refund a collection request.
   * @param id The ID of the collection request.
   * @returns A promise that resolves to a RefundPaymentCollectionResponse object.
   */
  public async refundCollectionRequest(
    id: string,
  ): Promise<RefundPaymentCollectionResponse> {
    const response: RefundPaymentCollectionResponse = await this.handleRequest(
      "POST",
      `/business/collections/${id}/refund`,
    );

    return Promise.resolve(response);
  }

  /**
   * Get a single collection request.
   * @param id The ID of the collection request.
   * @returns A promise that resolves to a SinglePaymentCollectionResponse object.
   */
  public async getSingleCollectionRequest(
    id: string,
  ): Promise<SinglePaymentCollectionResponse> {
    const response: SinglePaymentCollectionResponse = await this.handleRequest(
      "GET",
      `/business/collections/${id}`,
    );

    return Promise.resolve(response);
  }

  /**
   * Create a webhook.
   * @param data An object containing the URL, state, and active status of the webhook.
   * @returns A promise that resolves to a WebhookResponse object.
   */
  public async createWebhook(data: {
    url: string;
    state: string;
    active: boolean;
  }): Promise<WebhookResponse> {
    const response: WebhookResponse = await this.handleRequest(
      "POST",
      `/business/webhooks`,
      data,
    );

    return Promise.resolve(response);
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
    const response: WebhookResponse = await this.handleRequest(
      "PUT",
      `/business/webhooks`,
      data,
    );

    return Promise.resolve(response);
  }

  /**
   * Delete a webhook.
   * @param id The ID of the webhook to delete.
   * @returns A promise that resolves to a WebhookResponse object.
   */
  public async deleteWebhook(id: string): Promise<WebhookResponse> {
    const response: WebhookResponse = await this.handleRequest(
      "DELETE",
      `/business/webhooks/${id}`,
    );

    return Promise.resolve(response);
  }

  /**
   * Create a settlement.
   * @param data The crypto settlement form data.
   * @returns A promise that resolves to a SingleSettlement object.
   */
  public async createSettlement(
    data: CryptoSettlementForm,
  ): Promise<SingleSettlement> {
    const response: SingleSettlement = await this.handleRequest(
      "POST",
      `/business/settlements`,
      data,
    );

    return Promise.resolve(response);
  }

  /**
   * Get a settlement by sequence ID.
   * @param sequenceId The sequence ID of the settlement.
   * @returns A promise that resolves to a SingleSettlement object.
   */
  public async getSettlement(sequenceId: string): Promise<SingleSettlement> {
    const response: SingleSettlement = await this.handleRequest(
      "GET",
      `/business/settlements/sequence-id/${sequenceId}`,
    );

    return Promise.resolve(response);
  }
}
