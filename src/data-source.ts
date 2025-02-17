import dotenv from "dotenv";

dotenv.config();
import "dotenv/config";
import "reflect-metadata";
import { Point_Transaction } from "./models/Point_Transaction";
import { Transaction } from "./models/Transaction";
import { User_Bank } from "./models/User_Bank";
import { Wallet } from "./models/wallet";
import pkg from "typeorm";
const { DataSource } = pkg;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Point_Transaction, Transaction, User_Bank, Wallet],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
