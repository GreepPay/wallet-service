import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";


@Entity()
export class Offramp extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // Unique identifier for the transaction

  @Column({ type: "int" })
  wallet_id!: number; // ID of the wallet associated with the transaction

  @Column({ type: "int" })
  user_id!: number; // ID of the user associated with the transaction

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: string; // Amount of the withdrawal

  @Column({ type: "decimal", precision: 10, scale: 2 })
  balance_after!: string; // Wallet balance after the withdrawal

  @Column({ type: "varchar", length: 255 })
  payment_reference!: string; // Reference for the payment (e.g., transaction ID)

  @Column({ type: "enum", enum: ["active", "archived"], default: "active" })
  state!: "active" | "archived"; // Transaction state

  @Column({ type: "varchar", length: 255 })
  payment_channel!: string; // Payment channel used (e.g., bank, mobile money)

  @Column({ type: "text" })
  description!: string; // Description of the withdrawal

  @Column({ type: "varchar", length: 255 })
  status!: string; // Status of the transaction

  @Column({ type: "varchar", length: 255 })
  currency!: string; // Currency of the withdrawal (e.g., USDC, NGN)

  @Column({ type: "text", nullable: true })
  extra_data!: string | null; // Additional data (e.g., metadata)

  // Sender details
  @Column({ type: "varchar", length: 255, nullable: true })
  senderName?: string; // Sender's full name

  @Column({ type: "varchar", length: 255, nullable: true })
  senderCountry?: string; // Sender's country

  @Column({ type: "varchar", length: 20, nullable: true })
  senderPhone?: string; // Sender's phone number

  @Column({ type: "text", nullable: true })
  senderAddress?: string; // Sender's address

  @Column({ type: "date", nullable: true })
  senderDob?: string; // Sender's date of birth

  @Column({ type: "varchar", length: 255, nullable: true })
  senderEmail?: string; // Sender's email address

  @Column({ type: "varchar", length: 255, nullable: true })
  senderIdNumber?: string; // Sender's national ID number

  @Column({ type: "varchar", length: 255, nullable: true })
  senderIdType?: string; // Type of sender's ID

  @Column({ type: "varchar", length: 255, nullable: true })
  senderBusinessId?: string; // Sender's business ID (if institution)

  @Column({ type: "varchar", length: 255, nullable: true })
  senderBusinessName?: string; // Sender's business name (if institution)

  @Column({ type: "varchar", length: 255, nullable: true })
  senderAdditionalIdType?: string; // Additional ID type (if applicable)

  @Column({ type: "varchar", length: 255, nullable: true })
  senderAdditionalIdNumber?: string; // Additional ID number (if applicable)
}
