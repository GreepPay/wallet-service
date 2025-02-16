import "reflect-metadata";
import { Entity, Column, BaseEntity } from "typeorm";

@Entity()
export class Wallet extends BaseEntity {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // UUID for external identification

  @Column({ type: "varchar", default: "0" })
  total_balance!: string; // Total balance, default is '0'

  @Column({ type: "varchar", default: "0" })
  point_balance!: string; // Point balance, default is '0'

  @Column({ type: "varchar", default: "0" })
  credited_amount!: string; // Credited amount, default is '0'

  @Column({ type: "varchar", default: "0" })
  debited_amount!: string; // Debited amount, default is '0'

  @Column({ type: "varchar", default: "0" })
  locked_balance!: string; // Locked balance, default is '0'

  @Column({ type: "varchar", default: "0" })
  credited_point_amount!: string; // Credited point amount, default is '0'

  @Column({ type: "varchar", default: "0" })
  debited_point_amount!: string; // Debited point amount, default is '0'

  @Column({ type: "varchar", default: "0" })
  cash_point_balance!: string; // Cash point balance, default is '0'

  @Column({ type: "varchar", default: "0" })
  cash_per_point!: string; // Cash per point, default is '0'

  @Column({ type: "int", unique: true })
  user_id!: number; // User ID, unique

  @Column({ type: "varchar", nullable: true })
  wallet_account!: string | null; // Wallet account, nullable
}
