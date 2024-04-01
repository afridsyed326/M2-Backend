import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../entity/User.entity";
import { Coin } from "../entity/Coin.entity";
import { Network } from "../entity/Network.entity";
import { TransactionFee } from "../entity/TransactionFee.entity";
import { Transaction } from "../entity/Transaction.entity";

config();

const entities = [User, Coin, Network, Transaction, TransactionFee];

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
});
