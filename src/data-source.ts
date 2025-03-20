import dotenv from "dotenv";

dotenv.config();
import "dotenv/config";
import "reflect-metadata";
import { PointTransaction } from "./models/PointTransaction";
import { Transaction } from "./models/Transaction";
import { UserBank } from "./models/UserBank";
import { Wallet } from "./models/Wallet";
import pkg from "typeorm";
import fs from "fs";

const { DataSource } = pkg;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  ssl:
    process.env.DB_USE_SSL === "true"
      ? {
          rejectUnauthorized: true,
          ca: fs.readFileSync(__dirname + "/database/ca-cert.crt").toString(),
        }
      : false,
  entities: [ PointTransaction, Transaction, UserBank, Wallet ],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
