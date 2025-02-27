import "reflect-metadata";
import type { BunRequest } from "../routes/router";
import HttpResponse from "../common/Httpresponse";
import { OfframpService } from "../services/OfframpService";
import { YellowCard } from "../helpers/YellowCard";
import type {
  PaymentRequestForm,
  CryptoSettlementForm,
  ResolveBankAccountResponse,
  WebhookResponse,
} from "../types/YellowCard";

export class OfframpController {
  private offrampService: OfframpService;

  constructor() {
    this.offrampService = new OfframpService(new YellowCard());
  }

  /**
   * Retrieves the list of supported countries for withdrawals.
   */
  async getSupportedCountriesForWithdrawal(request: BunRequest) {
    try {
      const response = await this.offrampService.getSupportedCountriesForWithdrawal();
      return HttpResponse.success("Supported countries retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Resolve bank account details.
   */
  async resolveBankAccount(request: BunRequest) {
    try {
      const data = (await request.json()) as { accountNumber: string; networkId: string };// Extract account number and network ID from request body
      const response = await this.offrampService.resolveBankAccount(data);
      return HttpResponse.success("Bank account resolved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Submit a payment request (withdrawal).
   */
  async submitPaymentRequest(request: BunRequest) {
    try {
      const data: PaymentRequestForm = (await request.json()) as PaymentRequestForm;
      const wallet_id = parseInt(request.params.wallet_id, 10); // Extract wallet_id from URL params
      const user_id = parseInt(request.params.user_id, 10); // Extract user_id from URL params

      const response = await this.offrampService.submitPaymentRequest(
        data,
      );

      return HttpResponse.success("Payment request submitted successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Accept a payment request.
   */
  async acceptPaymentRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract payment request ID from URL params
      const response = await this.offrampService.acceptPaymentRequest(id);

      return HttpResponse.success("Payment request accepted successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Deny a payment request.
   */
  async denyPaymentRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract payment request ID from URL params
      const response = await this.offrampService.denyPaymentRequest(id);

      return HttpResponse.success("Payment request denied successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Get a single payment request.
   */
  async getPaymentRequest(request: BunRequest) {
    try {
      const id = request.params.id; // Extract payment request ID from URL params
      const response = await this.offrampService.getPaymentRequest(id);

      return HttpResponse.success("Payment request retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Create a settlement.
   */
  async createSettlement(request: BunRequest) {
    try {
      const data: CryptoSettlementForm = (await request.json()) as CryptoSettlementForm;
      const response = await this.offrampService.createSettlement(data);

      return HttpResponse.success("Settlement created successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
  
      
  

  /**
   * Get a settlement by sequence ID.
   */
  async getSettlement(request: BunRequest) {
    try {
      const sequenceId = request.params.sequenceId; // Extract sequence ID from URL params
      const response = await this.offrampService.getSettlement(sequenceId);

      return HttpResponse.success("Settlement retrieved successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Update a webhook.
   */
  async updateWebhook(request: BunRequest) {
    try {
        const data = (await request.json()) as {  id: string;   url: string; state: string;   active: boolean };// Extract webhook data from request body
      const response = await this.offrampService.updateWebhook(data);

      return HttpResponse.success("Webhook updated successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  /**
   * Delete a webhook.
   */
  async deleteWebhook(request: BunRequest) {
    try {
      const id = request.params.id; // Extract webhook ID from URL params
      const response = await this.offrampService.deleteWebhook(id);

      return HttpResponse.success("Webhook deleted successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
}