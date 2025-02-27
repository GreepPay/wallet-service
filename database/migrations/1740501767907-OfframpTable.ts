import "reflect-metadata";
import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";
const { Table } = pkg;

export class CreateOfframpTable1739119772543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "offramp",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "uuid", type: "uuid", isUnique: true },
          { name: "dr_or_cr", type: "enum", enum: ["debit"], default: "'debit'" },
          { name: "wallet_id", type: "int" },
          { name: "user_id", type: "int" },
          { name: "amount", type: "decimal", precision: 10, scale: 2 },
          { name: "balance_after", type: "decimal", precision: 10, scale: 2 },
          { name: "payment_reference", type: "varchar", length: "255" },
          { name: "state", type: "enum", enum: ["active", "archived"], default: "'active'" },
          { name: "payment_channel", type: "varchar", length: "255" },
          { name: "description", type: "text" },
          { name: "status", type: "varchar", length: "255" },
          { name: "currency", type: "varchar", length: "255" },
          { name: "extra_data", type: "text", isNullable: true },
          { name: "sender_name", type: "varchar", length: "255", isNullable: true },
          { name: "sender_country", type: "varchar", length: "255", isNullable: true },
          { name: "sender_phone", type: "varchar", length: "255", isNullable: true },
          { name: "sender_address", type: "text", isNullable: true },
          { name: "sender_dob", type: "varchar", length: "255", isNullable: true },
          { name: "sender_email", type: "varchar", length: "255", isNullable: true },
          { name: "sender_id_number", type: "varchar", length: "255", isNullable: true },
          { name: "sender_id_type", type: "varchar", length: "255", isNullable: true },
          { name: "sender_business_id", type: "varchar", length: "255", isNullable: true },
          { name: "sender_business_name", type: "varchar", length: "255", isNullable: true },
          { name: "sender_additional_id_type", type: "varchar", length: "255", isNullable: true },
          { name: "sender_additional_id_number", type: "varchar", length: "255", isNullable: true },
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
    await queryRunner.dropTable("offramp");
  }
}
