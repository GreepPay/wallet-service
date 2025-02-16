import "reflect-metadata";
import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table, TableForeignKey } = pkg;

export class CreateTransactionTable1739119668135 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transaction",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "uuid", type: "varchar", isUnique: true },
          {
            name: "dr_or_cr",
            type: "enum",
            enum: ["credit", "debit"],
          },
          { name: "currency", type: "varchar", default: "'USDC'" },
          { name: "wallet_id", type: "int" },
          { name: "user_id", type: "int" },
          { name: "amount", type: "decimal", precision: 10, scale: 2 },
          { name: "wallet_balance", type: "decimal", precision: 10, scale: 2 },
          { name: "charge_id", type: "varchar" },
          { name: "chargeable_type", type: "varchar" },
          { name: "description", type: "varchar" },
          {
            name: "status",
            type: "enum",
            enum: ["default", "pending", "successful"],
            default: "'default'",
          },
          { name: "charges", type: "varchar" },
          { name: "reference", type: "varchar" },
          { name: "extra_data", type: "varchar", isNullable: true },
          { name: "gateway", type: "varchar", default: "'unwind-wallet'" },
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
    await queryRunner.dropTable("transaction");
  }
}
