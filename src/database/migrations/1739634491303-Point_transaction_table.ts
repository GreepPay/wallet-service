import "reflect-metadata";
import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table } = pkg;

export class CreatePointTransactionTable1739119668134
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "point_transactions",
        columns: [
          { name: "uuid", type: "varchar", isUnique: true },
          {
            name: "dr_or_cr",
            type: "enum",
            enum: ["credit", "debit"],
          },

          {
            name: "state",
            type: "enum",
            enum: ["active", "archived"],
            default: "'active'",
          },
          { name: "wallet_id", type: "int" },
          { name: "user_id", type: "int" },
          { name: "amount", type: "decimal", precision: 10, scale: 2 },
          { name: "point_balance", type: "decimal", precision: 10, scale: 2 },
          { name: "charge_id", type: "varchar" },
          { name: "chargeable_type", type: "varchar" },
          { name: "description", type: "text" },
          {
            name: "status",
            type: "enum",
            enum: ["default", "pending", "successful"],
            default: "'default'",
          },
          { name: "reference", type: "varchar" },
          { name: "extra_data", type: "text", isNullable: true },
          {
            name: "currency",
            type: "varchar",
            length: "10",
            default: "'USDC'",
          },
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
    await queryRunner.dropTable("point_transaction");
  }
}
