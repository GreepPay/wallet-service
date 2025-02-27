import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";
@Entity()
export class Onramp extends BaseModel {
  @Column({ type: "uuid", unique: true })
  uuid!: string; // Unique identifier for the transaction


  @Column({ type: "decimal", precision: 10, scale: 2 })
  localAmount!: string; // Amount of the deposit

  @Column({ type: "varchar", length: 255 })
  payment_reference!: string; // Reference for the payment (e.g., transaction ID)

  @Column({ type: "varchar", length: 255 })
  payment_channel!: string; // Payment channel used (e.g., bank, mobile money)

  @Column({ type: "text" })
  description!: string; // Description of the deposit

  @Column({ type: "varchar", length: 255 })
  status!: string; // Status of the transaction

  @Column({ type: "varchar", length: 255 })
  currency!: string; // Currency of the deposit (e.g., USDC, NGN)

  // Recipient Details
  @Column({ type: "varchar", length: 255, nullable: true })
  recipientName!: string; // Recipient's full name

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientCountry!: string; // Recipient's country in ISO 3166 format

  @Column({ type: "text", nullable: true })
  recipientAddress!: string; // Recipient's address

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientDob!: string; // Recipient's date of birth (mm/dd/yyyy)

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientEmail!: string; // Recipient's email address

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientIdNumber!: string; // Recipient's ID number

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientIdType!: string; // Recipient's identity document type

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientAdditionalIdType!: string; // Recipient's additional ID type

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientAdditionalIdNumber!: string; // Recipient's additional ID number

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientPhone!: string; // Recipient's phone number

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientBusinessId!: string; // Recipient's business ID (for institutions)

  @Column({ type: "varchar", length: 255, nullable: true })
  recipientBusinessName!: string; // Recipient's business name (for institutions)
}