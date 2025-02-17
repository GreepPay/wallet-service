import { AppDataSource } from "../data-source";
import { UserBank } from "../models/UserBank";
import type {
  CreateUserBankForm,
  UpdateUserBankForm,
  SoftDeleteUserBankForm,
  CreateUserBankResponse,
  UpdateUserBankResponse,
  SoftDeleteUserBankResponse,
} from "../forms/User_BankForm";

export class UserBankService {
  // Create a new user bank
  async createUserBank(
    form: CreateUserBankForm,
  ): Promise<CreateUserBankResponse> {
    const userBankRepository = AppDataSource.getRepository(UserBank);

    // Create the user bank
    const userBank = new UserBank();
    userBank.uuid = form.uuid;
    userBank.user_id = form.user_id;
    userBank.wallet_id = form.wallet_id;
    userBank.bank_code = form.bank_code;
    userBank.bank_name = form.bank_name;
    userBank.account_no = form.account_no;
    userBank.currency = form.currency;
    userBank.is_verified = form.is_verified || false;
    userBank.meta_data = form.meta_data || null;

    // Save the user bank
    const savedUserBank = await userBankRepository.save(userBank);

    return {
      user_bank: savedUserBank,
    };
  }

  // Update user bank
  async updateUserBank(
    form: UpdateUserBankForm,
  ): Promise<UpdateUserBankResponse> {
    const userBankRepository = AppDataSource.getRepository(UserBank);

    // Find the user bank
    const userBank = await userBankRepository.findOne({
      where: { id: form.user_bank_id },
    });

    if (!userBank) {
      throw new Error("User bank not found.");
    }

    // Update user bank fields
    if (form.bank_code) userBank.bank_code = form.bank_code;
    if (form.bank_name) userBank.bank_name = form.bank_name;
    if (form.account_no) userBank.account_no = form.account_no;
    if (form.currency) userBank.currency = form.currency;
    if (form.is_verified !== undefined) userBank.is_verified = form.is_verified;
    if (form.meta_data !== undefined) userBank.meta_data = form.meta_data;

    // Save the updated user bank
    const updatedUserBank = await userBankRepository.save(userBank);

    return {
      success: true,
      message: "User bank updated successfully.",
      user_bank: updatedUserBank,
    };
  }

  // Soft delete a user bank
  async softDeleteUserBank(
    form: SoftDeleteUserBankForm,
  ): Promise<SoftDeleteUserBankResponse> {
    const userBankRepository = AppDataSource.getRepository(UserBank);

    // Find the user bank
    const userBank = await userBankRepository.findOne({
      where: { id: form.user_bank_id },
    });

    if (!userBank) {
      throw new Error("User bank not found.");
    }

    // Soft delete the user bank (mark as deleted)
    userBank.state = "archived";
    await userBankRepository.save(userBank);

    return {
      success: true,
      message: "User bank soft deleted successfully.",
    };
  }
}
