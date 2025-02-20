import type { UserBank } from "../models/UserBank";

/**
 * Request Forms
 */

// Form for creating a user bank
export interface CreateUserBankForm {
  uuid: string; // UUID for external identification
  user_id: number; // ID of the user
  wallet_id: number; // ID of the wallet
  bank_code: string; // Bank code
  bank_name: string; // Bank name
  account_no: string; // Bank account number
  currency: string; // Currency of the bank account
  is_verified?: boolean; // Verification status, default is false
  meta_data?: string | null; // Additional metadata (optional)
}

// Form for updating a user bank
export interface UpdateUserBankForm {
  user_bank_id: number; // ID of the user bank
  bank_code?: string; // New bank code
  bank_name?: string; // New bank name
  account_no?: string; // New account number
  currency?: string; // New currency
  is_verified?: boolean; // New verification status
  meta_data?: string | null; // New metadata
}

// Form for deleting a user bank
export interface SoftDeleteUserBankForm {
  user_bank_id: number; // ID of the user bank to delete
}

/**
 * Response Forms
 */

// Response for creating a user bank
export interface CreateUserBankResponse {
  user_bank: UserBank; // The created user bank object
}

// Response for updating a user bank
export interface UpdateUserBankResponse {
  success: boolean; // Indicates if the update was successful
  message: string; // A message describing the result
  user_bank: UserBank;
}

// Response for soft-deleting a user bank
export interface SoftDeleteUserBankResponse {
  success: boolean; // Indicates if the delete operation was successful
  message: string; // A message describing the result
}
