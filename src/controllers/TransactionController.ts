import "reflect-metadata";
import type { BunRequest } from "../routes/router";
import HttpResponse from "../common/Httpresponse";
import { TransactionService } from "../services/TransactionService";
import type {
  CreateTransactionForm,
  UpdateTransactionStatusForm,
  SoftDeleteTransactionForm,
} from "../forms";

export class TransactionController {
  // Create a new transaction
  async createTransaction(request: BunRequest) {
    let data: CreateTransactionForm =
      (await request.json()) as CreateTransactionForm;
    try {
      let response = await new TransactionService().createTransaction(data);
      return HttpResponse.success("Transaction created successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Update transaction status
  async updateTransactionStatus(request: BunRequest) {
    let data: UpdateTransactionStatusForm =
      (await request.json()) as UpdateTransactionStatusForm;
    try {
      let response = await new TransactionService().updateTransactionStatus(
        data,
      );
      return HttpResponse.success(
        "Transaction status updated successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Soft delete a transaction
  async softDeleteTransaction(request: BunRequest) {
    let data: SoftDeleteTransactionForm =
      (await request.json()) as SoftDeleteTransactionForm;
    try {
      let response = await new TransactionService().softDeleteTransaction(data);
      return HttpResponse.success(
        "Transaction soft deleted successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
}
