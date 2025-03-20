import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Transaction } from "./Transaction";
import type { Transaction as TransactionType } from "./Transaction";
import { PointTransaction } from "./PointTransaction";
import type { PointTransaction as PointTransactionType } from "./PointTransaction";
import { UserBank } from "./UserBank";
import type { UserBank as UserBankType } from "./UserBank";

@Entity("wallets")
export class Wallet extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string;

  @Column({ type: "varchar", default: "0" })
  total_balance!: string;

  @Column({ type: "varchar", default: "0" })
  point_balance!: string;

  @Column({ type: "varchar", default: "0" })
  credited_amount!: string;

  @Column({ type: "varchar", default: "0" })
  debited_amount!: string;

  @Column({ type: "varchar", default: "0" })
  locked_balance!: string;

  @Column({ type: "varchar", default: "0" })
  credited_point_amount!: string;

  @Column({ type: "enum", enum: ["active", "archived"], default: "active" })
  state!: "active" | "archived"; // transaction

  @Column({ type: "varchar", default: "0" })
  debited_point_amount!: string;

  @Column({ type: "varchar", default: "0" })
  cash_point_balance!: string;

  @Column({ type: "varchar", default: "0" })
  cash_per_point!: string;

  @Column({ type: "int", unique: true })
  user_id!: number;

  @Column({ type: "varchar", nullable: true })
  wallet_account!: string | null;

  @Column({ type: "varchar", default: "USDC" })
  currency!: string;

  // Explicit relationship with Transactions
  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions!: TransactionType[];

  // Explicit relationship with Point_Transactions
  @OneToMany(
    () => PointTransaction,
    (pointTransaction) => pointTransaction.wallet,
  )
  point_transactions!: PointTransactionType[];

  // Explicit relationship with UserBanks
  @OneToMany(() => UserBank, (userBank) => userBank.wallet)
  user_banks!: UserBankType[];
}
