import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Wallet } from "./Wallet";

@Entity()
export class UserBank extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string;

  @Column({ type: "int" })
  user_id!: number;

  @Column({ type: "int" })
  wallet_id!: number;

  @Column({ type: "varchar", length: 50 })
  bank_code!: string;

  @Column({ type: "varchar", length: 100 })
  bank_name!: string;

  @Column({ type: "varchar", length: 20 })
  account_no!: string;

  @Column({ type: "varchar", length: 10 })
  currency!: string;

  @Column({ type: "boolean", default: false })
  is_verified!: boolean;

  @Column({ type: "enum", enum: ["active", "archived"], default: "active" })
  state!: "active" | "archived"; // transaction

  @Column({ type: "text", nullable: true })
  meta_data!: string | null;

  // Explicit relationship with Wallet
  @ManyToOne(() => Wallet, (wallet) => wallet.user_banks)
  @JoinColumn({ name: "wallet_id" })
  wallet!: Wallet;
}
