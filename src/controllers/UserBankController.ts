import "reflect-metadata";
import type { BunRequest } from "../routes/router";
import HttpResponse from "../common/Httpresponse";
import { UserBankService } from "../services/UserBankService";
import type {
  CreateUserBankForm,
  UpdateUserBankForm,
  SoftDeleteUserBankForm,
} from "../forms/User_BankForm";

export class UserBankController {
  // Create a new user bank
  async createUserBank(request: BunRequest) {
    let data: CreateUserBankForm = (await request.json()) as CreateUserBankForm;
    try {
      let response = await new UserBankService().createUserBank(data);
      return HttpResponse.success("User bank created successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Update user bank
  async updateUserBank(request: BunRequest) {
    let data: UpdateUserBankForm = (await request.json()) as UpdateUserBankForm;
    try {
      let response = await new UserBankService().updateUserBank(data);
      return HttpResponse.success("User bank updated successfully", response);
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }

  // Soft delete a user bank
  async softDeleteUserBank(request: BunRequest) {
    let data: SoftDeleteUserBankForm =
      (await request.json()) as SoftDeleteUserBankForm;
    try {
      let response = await new UserBankService().softDeleteUserBank(data);
      return HttpResponse.success(
        "User bank soft deleted successfully",
        response,
      );
    } catch (error: any) {
      return HttpResponse.failure(error.message, 400);
    }
  }
}
