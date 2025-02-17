import "reflect-metadata";
import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table } = pkg;

export class CreateWalletTable1739119668136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "wallet",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "uuid", type: "varchar", isUnique: true },
          { name: "total_balance", type: "varchar", default: "'0'" },
          { name: "point_balance", type: "varchar", default: "'0'" },
          { name: "credited_amount", type: "varchar", default: "'0'" },
          { name: "debited_amount", type: "varchar", default: "'0'" },
          { name: "locked_balance", type: "varchar", default: "'0'" },
          { name: "credited_point_amount", type: "varchar", default: "'0'" },
          { name: "debited_point_amount", type: "varchar", default: "'0'" },
          { name: "cash_point_balance", type: "varchar", default: "'0'" },
          { name: "cash_per_point", type: "varchar", default: "'0'" },
          { name: "user_id", type: "int", isUnique: true },
          { name: "wallet_account", type: "varchar", isNullable: true },
          { name: "currency", type: "varchar", default: "'USDC'" },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("wallet");
  }
}
