import "reflect-metadata";
import type { BunRequest } from "../routes/router";
import HttpResponse from "../common/Httpresponse";
import { WalletService } from "../services/WalletService";
import type {
  CreateWalletForm,
  UpdateWalletBalanceForm,
  SoftDeleteWalletForm,
} from "../forms/WalletForm";

export class WalletController {
  // Create a new wallet
  async createWallet(request: BunRequest) {
    let data: CreateWalletForm = (await request.json()) as CreateWalletForm;
    try {
      let response = await new WalletService().createWallet(data);
      return HttpResponse.success("Wallet created successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Update wallet balance
  async updateWalletBalance(request: BunRequest) {
    let data: UpdateWalletBalanceForm =
      (await request.json()) as UpdateWalletBalanceForm;
    try {
      let response = await new WalletService().updateWalletBalance(data);
      return HttpResponse.success(
        "Wallet balance updated successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Soft delete a wallet
  async softDeleteWallet(request: BunRequest) {
    let data: SoftDeleteWalletForm =
      (await request.json()) as SoftDeleteWalletForm;
    try {
      let response = await new WalletService().softDeleteWallet(data);
      return HttpResponse.success("Wallet soft deleted successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
}
