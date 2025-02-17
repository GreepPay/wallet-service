import "reflect-metadata";
import type { BunRequest } from "../routes/router";
import HttpResponse from "../common/Httpresponse";
import { PointTransactionService } from "../services/PointTransactionService";
import type {
  CreatePointTransactionForm,
  UpdatePointTransactionStatusForm,
  SoftDeletePointTransactionForm,
} from "../forms/Point_TransactionForm";

export class PointTransactionController {
  // Create a new point transaction
  async createPointTransaction(request: BunRequest) {
    let data: CreatePointTransactionForm =
      (await request.json()) as CreatePointTransactionForm;
    try {
      let response = await new PointTransactionService().createPointTransaction(
        data,
      );
      return HttpResponse.success(
        "Point transaction created successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Update point transaction status
  async updatePointTransactionStatus(request: BunRequest) {
    let data: UpdatePointTransactionStatusForm =
      (await request.json()) as UpdatePointTransactionStatusForm;
    try {
      let response =
        await new PointTransactionService().updatePointTransactionStatus(data);
      return HttpResponse.success(
        "Point transaction status updated successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Soft delete a point transaction
  async softDeletePointTransaction(request: BunRequest) {
    let data: SoftDeletePointTransactionForm =
      (await request.json()) as SoftDeletePointTransactionForm;
    try {
      let response =
        await new PointTransactionService().softDeletePointTransaction(data);
      return HttpResponse.success(
        "Point transaction soft deleted successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
}
