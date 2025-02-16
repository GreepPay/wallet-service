import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Wallet extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // UUID for external identification

  @Column({ type: "int" })
  user_id!: number; // ID of the user

  @Column({ type: "int" })
  wallet_id!: number; // ID of the wallet

  @Column({ type: "varchar", length: 50 })
  bank_code!: string; // Bank code

  @Column({ type: "varchar", length: 100 })
  bank_name!: string; // Bank name

  @Column({ type: "varchar", length: 20 })
  account_no!: string; // Bank account number

  @Column({ type: "boolean", default: false })
  is_verified!: boolean; // Verification status, default is false

  @Column({ type: "text", nullable: true })
  meta_data!: string; // Additional metadata (optional)
}
