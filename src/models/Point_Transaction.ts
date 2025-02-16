import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEnum } from "class-validator";
import { BaseModel } from "./BaseModel";

@Entity()
export class Transaction extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // UUID for external identification

  @Column({ type: "enum", enum: ["credit", "debit"] })
  @IsEnum(["credit", "debit"])
  dr_or_cr!: "credit" | "debit"; // Type of transaction (credit or debit)

  @Column({ type: "int" })
  wallet_id!: number; // ID of the wallet associated with the transaction

  @Column({ type: "int" })
  user_id!: number; // ID of the user associated with the transaction

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: string; // Amount of the transaction

  @Column({ type: "decimal", precision: 10, scale: 2 })
  point_balance!: string; // Point balance after the transaction

  @Column({ type: "varchar", length: 255 })
  charge_id!: string; // ID of the charge associated with the transaction

  @Column({ type: "varchar", length: 255 })
  chargeable_type!: string; // Type of chargeable entity

  @Column({ type: "text" })
  description!: string; // Description of the transaction

  @Column({
    type: "enum",
    enum: ["default", "pending", "successful"],
    default: "default",
  })
  @IsEnum(["default", "pending", "successful"])
  status!: "default" | "pending" | "successful"; // Status of the transaction

  @Column({ type: "varchar", length: 255 })
  reference!: string; // Reference for the transaction

  @Column({ type: "text", nullable: true })
  extra_data!: string | null; // Additional data (nullable)
}
