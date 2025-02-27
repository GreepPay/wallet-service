import "reflect-metadata";
import type { BunRequest } from "../routes/router";
import HttpResponse from "../common/Httpresponse";
import { OnrampService } from "../services/OnrampService";
import type {
  PaymentCollectionForm,
  AcceptPaymentCollectionResponse,
  DenyPaymentCollectionResponse,
  CancelPaymentCollectionResponse,
  RefundPaymentCollectionResponse,
  SinglePaymentCollectionResponse,
  PaymentChannel,
  PaymentNetwork,
  ExchangeRate,
  AccountDetails,
  WebhookResponse,
} from "../types/YellowCard";

export class OnrampController {
  private onrampService: OnrampService;

  constructor() {
    this.onrampService = new OnrampService();
  }

  /**
   * Submit a payment collection (deposit).
   */
  async submitPaymentCollection(request: BunRequest) {
    try {
      const data: PaymentCollectionForm = (await request.json()) as PaymentCollectionForm;
     

      const response = await this.onrampService.submitPaymentCollection(
        data,
  
      );

      return HttpResponse.success("Payment collection submitted successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Accept a collection request.
   */
  async acceptCollectionRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract collection ID from URL params
      const response = await this.onrampService.acceptCollectionRequest(id);

      return HttpResponse.success("Collection request accepted successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Deny a collection request.
   */
  async denyCollectionRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract collection ID from URL params
      const response = await this.onrampService.denyCollectionRequest(id);

      return HttpResponse.success("Collection request denied successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Cancel a collection request.
   */
  async cancelCollectionRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract collection ID from URL params
      const response = await this.onrampService.cancelCollectionRequest(id);

      return HttpResponse.success("Collection request canceled successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Refund a collection request.
   */
  async refundCollectionRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract collection ID from URL params
      const response = await this.onrampService.refundCollectionRequest(id);

      return HttpResponse.success("Collection request refunded successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get supported countries for deposit.
   */
  async getSupportedCountriesForDeposit(request: BunRequest) {
    try {
      const response = await this.onrampService.getSupportedCountriesForDeposit();
      return HttpResponse.success("Supported countries retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get available payment channels for a specific country.
   */
  async getChannels(request: BunRequest) {
    try {
      const country_code = request.params.country_code; // Extract country code from URL params
      const response = await this.onrampService.getChannels(country_code);
      return HttpResponse.success("Payment channels retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get available payment networks for a specific country.
   */
  async getNetworks(request: BunRequest) {
    try {
      const country_code = request.params.country_code; // Extract country code from URL params
      const response = await this.onrampService.getNetworks(country_code);
      return HttpResponse.success("Payment networks retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get the base exchange rate for a specific currency.
   */
  async getBaseExchangeRate(request: BunRequest) {
    try {
      const currency = request.params.currency; // Extract currency from URL params
      const response = await this.onrampService.getBaseExchangeRate(currency);
      return HttpResponse.success("Base exchange rate retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get the global account details.
   */
  async getGlobalAccountDetails(request: BunRequest) {
    try {
      const response = await this.onrampService.getGlobalAccountDetails();
      return HttpResponse.success("Global account details retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Create a webhook.
   */
  async createWebhook(request: BunRequest) {
    try {
      const data = (await request.json()) as { url: string; state: string;   active: boolean };
      const response = await this.onrampService.createWebhook(data);
      return HttpResponse.success("Webhook created successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get a single collection request.
   */
  async getSingleCollectionRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract collection ID from URL params
      const response = await this.onrampService.getSingleCollectionRequest(id);
      return HttpResponse.success("Collection request retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
}