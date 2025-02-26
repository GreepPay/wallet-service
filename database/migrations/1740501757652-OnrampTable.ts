import "reflect-metadata";
import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table } = pkg;

export class CreateOnrampTable1739119774321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "onramp",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "uuid", type: "uuid", isUnique: true },
          {
            name: "dr_or_cr",
            type: "enum",
            enum: ["credit"],
            default: "'credit'",
          },
          { name: "wallet_id", type: "int" },
          { name: "user_id", type: "int" },
          { name: "amount", type: "decimal", precision: 10, scale: 2 },
          { name: "balance_after", type: "decimal", precision: 10, scale: 2 },
          { name: "payment_reference", type: "varchar", length: "255" },
          {
            name: "state",
            type: "enum",
            enum: ["active", "archived"],
            default: "'active'",
          },
          { name: "payment_channel", type: "varchar", length: "255" },
          { name: "description", type: "text" },
          { name: "status", type: "varchar", length: "255" },
          { name: "currency", type: "varchar", length: "255" },
          { name: "extra_data", type: "text", isNullable: true },
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
        foreignKeys: [
          {
            columnNames: ["wallet_id"],
            referencedTableName: "wallet",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("onramp");
  }
}
