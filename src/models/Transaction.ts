import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import type { Wallet as WalletType } from "./Wallet";
import { Wallet } from "./Wallet";

@Entity()
export class Transaction extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string;

  @Column({ type: "enum", enum: ["credit", "debit"] })
  dr_or_cr!: "credit" | "debit";

  @Column({ type: "varchar", default: "USDC" })
  currency!: string;

  @Column({ type: "int" })
  wallet_id!: number;

  @Column({ type: "int" })
  user_id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  wallet_balance!: string;

  @Column({ type: "varchar" })
  charge_id!: string;

  @Column({ type: "varchar" })
  chargeable_type!: string;

  @Column({ type: "varchar" })
  description!: string;

  @Column({
    type: "enum",
    enum: ["default", "pending", "successful"],
    default: "default",
  })
  status!: "default" | "pending" | "successful";

  @Column({ type: "varchar" })
  charges!: string;

  @Column({ type: "varchar" })
  reference!: string;

  @Column({ type: "enum", enum: ["active", "archived"], default: "active" })
  state!: "active" | "archived"; // transaction

  @Column({ type: "varchar", default: "Greep-wallet" })
  gateway!: string;

  // Explicit relationship with Wallet
  @ManyToOne(() => Wallet, { nullable: true })
  @JoinColumn({ name: "wallet_id" })
  wallet!: WalletType | null;
}
