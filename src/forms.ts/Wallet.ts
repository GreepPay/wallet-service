import type { Wallet } from "../models/Wallet";

/**
 * Request Forms
 */

// Form for creating a wallet
export interface CreateWalletForm {
  uuid: string; // UUID for external identification
  user_id: number; // ID of the user
  total_balance?: string; // Total balance, default is '0'
  point_balance?: string; // Point balance, default is '0'
  credited_amount?: string; // Credited amount, default is '0'
  debited_amount?: string; // Debited amount, default is '0'
  locked_balance?: string; // Locked balance, default is '0'
  credited_point_amount?: string; // Credited point amount, default is '0'
  debited_point_amount?: string; // Debited point amount, default is '0'
  cash_point_balance?: string; // Cash point balance, default is '0'
  cash_per_point?: string; // Cash per point, default is '0'
  wallet_account?: string | null; // Wallet account, nullable
  currency?: string; // Currency, default is 'USDC'
}

// Form for updating a wallet balance
export interface UpdateWalletBalanceForm {
  wallet_id: number; // ID of the wallet
  total_balance?: string; // New total balance
  point_balance?: string; // New point balance
  credited_amount?: string; // New credited amount
  debited_amount?: string; // New debited amount
  locked_balance?: string; // New locked balance
  credited_point_amount?: string; // New credited point amount
  debited_point_amount?: string; // New debited point amount
  cash_point_balance?: string; // New cash point balance
  cash_per_point?: string; // New cash per point
}

// Form for deleting a wallet
export interface SoftDeleteWalletForm {
  wallet_id: number; // ID of the wallet to delete
}

/**
 * Response Forms
 */

// Response for creating a wallet
export interface CreateWalletResponse {
  wallet: Wallet; // The created wallet object
}

// Response for updating a wallet balance
export interface UpdateWalletBalanceResponse {
  success: boolean; // Indicates if the update was successful
  message: string; // A message describing the result
}

// Response for soft-deleting a wallet
export interface SoftDeleteWalletResponse {
  success: boolean; // Indicates if the delete operation was successful
  message: string; // A message describing the result
}
