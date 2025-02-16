import { AppDataSource } from "../data-source";
import { Wallet } from "../models/wallet";
import type {
  CreateWalletForm,
  UpdateWalletBalanceForm,
  SoftDeleteWalletForm,
  CreateWalletResponse,
  UpdateWalletBalanceResponse,
  SoftDeleteWalletResponse,
} from "../forms/walletForm";

export class WalletService {
  // Create a new wallet
  async createWallet(form: CreateWalletForm): Promise<CreateWalletResponse> {
    const walletRepository = AppDataSource.getRepository(Wallet);

    // Create the wallet
    const wallet = new Wallet();
    wallet.uuid = form.uuid;
    wallet.user_id = form.user_id;
    wallet.total_balance = form.total_balance || "0";
    wallet.point_balance = form.point_balance || "0";
    wallet.credited_amount = form.credited_amount || "0";
    wallet.debited_amount = form.debited_amount || "0";
    wallet.locked_balance = form.locked_balance || "0";
    wallet.credited_point_amount = form.credited_point_amount || "0";
    wallet.debited_point_amount = form.debited_point_amount || "0";
    wallet.cash_point_balance = form.cash_point_balance || "0";
    wallet.cash_per_point = form.cash_per_point || "0";
    wallet.wallet_account = form.wallet_account || null;
    wallet.currency = form.currency || "USDC";

    // Save the wallet
    const savedWallet = await walletRepository.save(wallet);

    return {
      wallet: savedWallet,
    };
  }

  // Update wallet balance
  async updateWalletBalance(
    form: UpdateWalletBalanceForm,
  ): Promise<UpdateWalletBalanceResponse> {
    const walletRepository = AppDataSource.getRepository(Wallet);

    // Find the wallet
    const wallet = await walletRepository.findOne({
      where: { id: form.wallet_id },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    // Update wallet balances
    if (form.total_balance) wallet.total_balance = form.total_balance;
    if (form.point_balance) wallet.point_balance = form.point_balance;
    if (form.credited_amount) wallet.credited_amount = form.credited_amount;
    if (form.debited_amount) wallet.debited_amount = form.debited_amount;
    if (form.locked_balance) wallet.locked_balance = form.locked_balance;
    if (form.credited_point_amount)
      wallet.credited_point_amount = form.credited_point_amount;
    if (form.debited_point_amount)
      wallet.debited_point_amount = form.debited_point_amount;
    if (form.cash_point_balance)
      wallet.cash_point_balance = form.cash_point_balance;
    if (form.cash_per_point) wallet.cash_per_point = form.cash_per_point;

    // Save the updated wallet
    const updatedWallet = await walletRepository.save(wallet);

    return {
      success: true,
      message: "Wallet balance updated successfully.",
      wallet: updatedWallet,
    };
  }

  // Soft delete a wallet
  async softDeleteWallet(
    form: SoftDeleteWalletForm,
  ): Promise<SoftDeleteWalletResponse> {
    const walletRepository = AppDataSource.getRepository(Wallet);

    // Find the wallet
    const wallet = await walletRepository.findOne({
      where: { id: form.wallet_id },
    });

    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    // Soft delete the wallet (mark as deleted)
    wallet.state = "archived";
    await walletRepository.save(wallet);

    return {
      success: true,
      message: "Wallet soft deleted successfully.",
    };
  }
}
