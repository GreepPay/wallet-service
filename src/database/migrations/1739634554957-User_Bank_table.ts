import "reflect-metadata";
import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table } = pkg;

export class CreateUserBankTable1739119668137 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_banks",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "uuid", type: "varchar", length: "255", isUnique: true },
          { name: "user_id", type: "int" },
          { name: "wallet_id", type: "int" },
          { name: "bank_code", type: "varchar", length: "50" },
          { name: "bank_name", type: "varchar", length: "100" },
          { name: "account_no", type: "varchar", length: "20" },
          { name: "currency", type: "varchar", length: "10" },
          { name: "is_verified", type: "boolean", default: false },
          { name: "meta_data", type: "text", isNullable: true },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "state",
            type: "enum",
            enum: ["active", "archived"],
            default: "'active'",
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
    await queryRunner.dropTable("user_bank");
  }
}
