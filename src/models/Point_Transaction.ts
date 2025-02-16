import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Wallet } from "./wallet";

@Entity()
export class Point_Transaction extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string;

  @Column({ type: "enum", enum: ["credit", "debit"] })
  dr_or_cr!: "credit" | "debit";

  @Column({ type: "int" })
  wallet_id!: number;

  @Column({ type: "int" })
  user_id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  point_balance!: string;

  @Column({ type: "varchar", length: 255 })
  charge_id!: string;

  @Column({ type: "varchar", length: 255 })
  chargeable_type!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({
    type: "enum",
    enum: ["default", "pending", "successful"],
    default: "default",
  })
  status!: "default" | "pending" | "successful";

  @Column({ type: "varchar", length: 255 })
  reference!: string;

  @Column({ type: "text", nullable: true })
  extra_data!: string | null;

  @Column({ type: "varchar", default: "USDC" })
  currency!: string;

  // Explicit relationship with Wallet
  @ManyToOne(() => Wallet, (wallet) => wallet.point_transactions)
  @JoinColumn({ name: "wallet_id" })
  wallet!: Wallet;
}
