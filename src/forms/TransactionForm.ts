import type { Transaction } from "../models/Transaction";

/**
 * Request Forms
 */

// Form for creating a transaction
export interface CreateTransactionForm {
  uuid: string; // UUID for external identification
  dr_or_cr: "credit" | "debit"; // Type of transaction (credit or debit)
  currency: string; // Currency, default is 'USDC'
  wallet_id: number; // ID of the wallet
  user_id: number; // ID of the user
  amount: string; // Transaction amount
  wallet_balance: string; // Wallet balance after transaction
  charge_id: string; // Charge ID
  chargeable_type: string; // Chargeable type
  description: string; // Transaction description
  status: "default" | "pending" | "successful"; // Transaction status
  charges: string; // Charges applied
  reference: string; // Transaction reference
  extra_data?: string | null; // Extra data, nullable
  gateway?: string; // Gateway, default is 'unwind-wallet'
}

// Form for updating a transaction status
export interface UpdateTransactionStatusForm {
  transaction_id: number; // ID of the transaction
  status: "default" | "pending" | "successful"; // New status
}

// Form for deleting a transaction
export interface SoftDeleteTransactionForm {
  transaction_id: number; // ID of the transaction to delete
}

/**
 * Response Forms
 */

// Response for creating a transaction
export interface CreateTransactionResponse {
  transaction: Transaction; // The created transaction object
}

// Response for updating a transaction status
export interface UpdateTransactionStatusResponse {
  success: boolean; // Indicates if the update was successful
  message: string; // A message describing the result
  transaction: Transaction;
}

// Response for soft-deleting a transaction
export interface SoftDeleteTransactionResponse {
  success: boolean; // Indicates if the delete operation was successful
  message: string; // A message describing the result
}
