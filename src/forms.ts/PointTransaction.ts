import type { Point_Transaction } from "../models/Point_Transaction";

/**
 * Request Forms
 */

// Form for creating a point transaction
export interface CreatePointTransactionForm {
  uuid: string; // UUID for external identification
  dr_or_cr: "credit" | "debit"; // Type of transaction (credit or debit)
  wallet_id: number; // ID of the wallet
  user_id: number; // ID of the user
  amount: string; // Transaction amount
  point_balance: string; // Point balance after transaction
  charge_id: string; // Charge ID
  chargeable_type: string; // Chargeable type
  description: string; // Transaction description
  status: "default" | "pending" | "successful"; // Transaction status
  reference: string; // Transaction reference
  extra_data?: string | null; // Extra data, nullable
  currency?: string; // Currency, default is 'USDC'
}

// Form for updating a point transaction status
export interface UpdatePointTransactionStatusForm {
  point_transaction_id: number; // ID of the point transaction
  status: "default" | "pending" | "successful"; // New status
}

// Form for deleting a point transaction
export interface SoftDeletePointTransactionForm {
  point_transaction_id: number; // ID of the point transaction to delete
}

/**
 * Response Forms
 */

// Response for creating a point transaction
export interface CreatePointTransactionResponse {
  point_transaction: Point_Transaction; // The created point transaction object
}

// Response for updating a point transaction status
export interface UpdatePointTransactionStatusResponse {
  success: boolean; // Indicates if the update was successful
  message: string; // A message describing the result
}

// Response for soft-deleting a point transaction
export interface SoftDeletePointTransactionResponse {
  success: boolean; // Indicates if the delete operation was successful
  message: string; // A message describing the result
}
