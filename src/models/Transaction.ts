import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";
import { IsEnum } from "class-validator";

@Entity()
export class Transaction extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // UUID for external identification

  @Column({ type: "enum", enum: ["credit", "debit"] })
  @IsEnum(["credit", "debit"])
  dr_or_cr!: "credit" | "debit"; // Credit or Debit transaction

  @Column({ type: "varchar", default: "ngn" })
  currency!: string; // Currency, default is 'ngn'

  @Column({ type: "int" })
  wallet_id!: number; // Wallet ID

  @Column({ type: "int" })
  user_id!: number; // User ID

  @Column({ type: "varchar" })
  amount!: string; // Transaction amount

  @Column({ type: "varchar" })
  wallet_balance!: string; // Wallet balance after transaction

  @Column({ type: "varchar" })
  charge_id!: string; // Charge ID

  @Column({ type: "varchar" })
  chargeable_type!: string; // Chargeable type

  @Column({ type: "varchar" })
  description!: string; // Transaction description

  @Column({
    type: "enum",
    enum: ["default", "pending", "successful"],
    default: "default",
  })
  @IsEnum(["default", "pending", "successful"])
  status!: "default" | "pending" | "successful"; // Transaction status

  @Column({ type: "varchar" })
  charges!: string; // Charges applied

  @Column({ type: "varchar" })
  reference!: string; // Transaction reference

  @Column({ type: "varchar", nullable: true })
  extra_data!: string | null; // Extra data, nullable

  @Column({ type: "varchar", default: "unwind-wallet" })
  gateway!: string; // Gateway, default is 'unwind-wallet'
}
