import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Wallet } from "./Wallet";

@Entity()
export class Onramp extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // Unique identifier for the transaction

  @Column({ type: "enum", enum: ["credit"], default: "credit" })
  dr_or_cr!: "credit"; // Onramp is always a credit operation

  @Column({ type: "int" })
  wallet_id!: number; // ID of the wallet associated with the transaction

  @Column({ type: "int" })
  user_id!: number; // ID of the user associated with the transaction

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: string; // Amount of the deposit

  @Column({ type: "decimal", precision: 10, scale: 2 })
  balance_after!: string; // Wallet balance after the deposit

  @Column({ type: "varchar", length: 255 })
  payment_reference!: string; // Reference for the payment (e.g., transaction ID)

  @Column({ type: "enum", enum: ["active", "archived"], default: "active" })
  state!: "active" | "archived"; // Transaction state

  
  
  @Column({ type: "varchar", length: 255 })
  payment_channel!: string; // Payment channel used (e.g., bank, mobile money)

  @Column({ type: "text" })
  description!: string; // Description of the deposit

  @Column({ type: "varchar", length: 255 }) // Changed to varchar for string type
    status!: string;

  @Column({ type: "varchar", length: 255 })
  currency!: string; // Currency of the deposit (e.g., USDC, NGN)

  @Column({ type: "text", nullable: true })
  extra_data!: string | null; // Additional data (e.g., metadata)

  // Relationship with Wallet
  @ManyToOne(() => Wallet, (wallet) => wallet.onramp_transactions)
  @JoinColumn({ name: "wallet_id" })
  wallet!: Wallet;
}