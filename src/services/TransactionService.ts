import { AppDataSource } from "../data-source";
import { Transaction } from "../models/Transaction";
import { Wallet } from "../models/Wallet";
import type {
  CreateTransactionForm,
  UpdateTransactionStatusForm,
  SoftDeleteTransactionForm,
  CreateTransactionResponse,
  UpdateTransactionStatusResponse,
  SoftDeleteTransactionResponse,
} from "../forms/TransactionForm";

export class TransactionService {
  // Create a new transaction
  async createTransaction(
    form: CreateTransactionForm,
  ): Promise<CreateTransactionResponse> {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const walletRepository = AppDataSource.getRepository(Wallet);

    // Find the wallet
    const wallet = await walletRepository.findOne({
      where: { id: form.wallet_id },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    // Create the transaction
    const transaction = new Transaction();
    transaction.uuid = form.uuid;
    transaction.dr_or_cr = form.dr_or_cr;
    transaction.currency = form.currency || "USDC";
    transaction.wallet_id = form.wallet_id;
    transaction.user_id = form.user_id;
    transaction.amount = form.amount;
    transaction.wallet_balance = form.wallet_balance;
    transaction.charge_id = form.charge_id;
    transaction.chargeable_type = form.chargeable_type;
    transaction.description = form.description;
    transaction.status = form.status || "default";
    transaction.charges = form.charges;
    transaction.reference = form.reference;
    transaction.gateway = form.gateway || "unwind-wallet";

    // Save the transaction
    const savedTransaction = await transactionRepository.save(transaction);

    // Update the wallet balance
    if (form.dr_or_cr === "credit") {
      wallet.credited_amount = (
        parseFloat(wallet.credited_amount) + parseFloat(form.amount)
      ).toString();
      wallet.total_balance = (
        parseFloat(wallet.total_balance) + parseFloat(form.amount)
      ).toString();
    } else if (form.dr_or_cr === "debit") {
       wallet.debited_amount = (
         parseFloat(wallet.debited_amount) + parseFloat(form.amount)
       ).toString();
      wallet.total_balance = (
        parseFloat(wallet.total_balance) - parseFloat(form.amount)
      ).toString();
    }

    await walletRepository.save(wallet);

    return {
      transaction: savedTransaction,
    };
  }

  // Update transaction status
  async updateTransactionStatus(
    form: UpdateTransactionStatusForm,
  ): Promise<UpdateTransactionStatusResponse> {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    // Find the transaction
    const transaction = await transactionRepository.findOne({
      where: { id: form.transaction_id },
    });

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    // Update the transaction status
    transaction.status = form.status;
    const updatedTransaction = await transactionRepository.save(transaction);

    return {
      success: true,
      message: "Transaction status updated successfully.",
      transaction: updatedTransaction,
    };
  }

  // Soft delete a transaction
  async softDeleteTransaction(
    form: SoftDeleteTransactionForm,
  ): Promise<SoftDeleteTransactionResponse> {
    const transactionRepository = AppDataSource.getRepository(Transaction);

    // Find the transaction
    const transaction = await transactionRepository.findOne({
      where: { id: form.transaction_id },
    });

    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    // Soft delete the transaction (mark as deleted)
    transaction.state = "archived";
    await transactionRepository.save(transaction);

    return {
      success: true,
      message: "Transaction soft deleted successfully.",
    };
  }
}
