import { AppDataSource } from "../data-source";
import { PointTransaction } from "../models/PointTransaction";
import { Wallet } from "../models/Wallet";
import type {
  CreatePointTransactionForm,
  UpdatePointTransactionStatusForm,
  SoftDeletePointTransactionForm,
  CreatePointTransactionResponse,
  UpdatePointTransactionStatusResponse,
  SoftDeletePointTransactionResponse,
} from "../forms/PointTransactionForm";

export class PointTransactionService {
  // Create a new point transaction
  async createPointTransaction(
    form: CreatePointTransactionForm,
  ): Promise<CreatePointTransactionResponse> {
    const pointTransactionRepository =
      AppDataSource.getRepository(PointTransaction);
    const walletRepository = AppDataSource.getRepository(Wallet);

    // Find the wallet
    const wallet = await walletRepository.findOne({
      where: { id: form.wallet_id },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    // Create the point transaction
    const pointTransaction = new PointTransaction();
    pointTransaction.uuid = form.uuid;
    pointTransaction.dr_or_cr = form.dr_or_cr;
    pointTransaction.wallet_id = form.wallet_id;
    pointTransaction.user_id = form.user_id;
    pointTransaction.amount = form.amount;
    pointTransaction.point_balance = form.point_balance;
    pointTransaction.charge_id = form.charge_id;
    pointTransaction.chargeable_type = form.chargeable_type;
    pointTransaction.description = form.description;
    pointTransaction.status = form.status || "default";
    pointTransaction.reference = form.reference;
    pointTransaction.extra_data = form.extra_data || null;
    pointTransaction.currency = form.currency || "USDC";

    // Save the point transaction
    const savedPointTransaction =
      await pointTransactionRepository.save(pointTransaction);

    // Update the wallet point balance
    if (form.dr_or_cr === "credit") {
      wallet.point_balance = (
        parseFloat(wallet.point_balance) + parseFloat(form.amount)
      ).toString();
    } else if (form.dr_or_cr === "debit") {
      wallet.point_balance = (
        parseFloat(wallet.point_balance) - parseFloat(form.amount)
      ).toString();
    }

    await walletRepository.save(wallet);

    return {
      point_transaction: savedPointTransaction,
    };
  }

  // Update point transaction status
  async updatePointTransactionStatus(
    form: UpdatePointTransactionStatusForm,
  ): Promise<UpdatePointTransactionStatusResponse> {
    const pointTransactionRepository =
      AppDataSource.getRepository(PointTransaction);

    // Find the point transaction
    const pointTransaction = await pointTransactionRepository.findOne({
      where: { id: form.point_transaction_id },
    });

    if (!pointTransaction) {
      throw new Error("Point transaction not found.");
    }

    // Update the point transaction status
    pointTransaction.status = form.status;
    const updatedPointTransaction =
      await pointTransactionRepository.save(pointTransaction);

    return {
      success: true,
      message: "Point transaction status updated successfully.",
      point_transaction: updatedPointTransaction,
    };
  }

  // Soft delete a point transaction
  async softDeletePointTransaction(
    form: SoftDeletePointTransactionForm,
  ): Promise<SoftDeletePointTransactionResponse> {
    const pointTransactionRepository =
      AppDataSource.getRepository(PointTransaction);

    // Find the point transaction
    const pointTransaction = await pointTransactionRepository.findOne({
      where: { id: form.point_transaction_id },
    });

    if (!pointTransaction) {
      throw new Error("Point transaction not found.");
    }

    // Soft delete the point transaction (mark as deleted)
    pointTransaction.state = "archived";
    await pointTransactionRepository.save(pointTransaction);

    return {
      success: true,
      message: "Point transaction soft deleted successfully.",
    };
  }
}
