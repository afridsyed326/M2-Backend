import "reflect-metadata";
import { DataSource, Transaction } from "typeorm";
import { config } from "dotenv";
import { User } from "../entity/User.entity";
import { Coin } from "../entity/Coin.entity";
import { Network } from "../entity/Network.entity";
import { FEE_TYPE, TransactionFee } from "../entity/TransactionFee.entity";
import { COIN_TRANSACTION_TYPE } from "../entity/Transaction.entity";

config();

(async () => {
    const entities = [User, Coin, Network, Transaction, TransactionFee];
    const AppDataSource = new DataSource({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: entities,
        migrations: [],
        subscribers: [],
    });

    AppDataSource.initialize()
        .then(async () => {
            // create a new coin
            const m2xCoin = new Coin();
            m2xCoin.name = "M2X Token";
            m2xCoin.symbol = "M2X";
            await AppDataSource.manager.save(m2xCoin);

            // create a new network for transaction
            const network = new Network();
            network.name = "TRC/20";
            network.code = "TRC_20";
            await AppDataSource.manager.save(network);

            const transactionTypes = Object.values(COIN_TRANSACTION_TYPE);

            for (const trxType of transactionTypes) {
                const fee = new TransactionFee();
                fee.fee = 10;
                fee.type = FEE_TYPE.AMOUNT;
                fee.coin = m2xCoin;
                fee.transactionType = trxType;
                await AppDataSource.manager.save(fee);
            }
        })
        .catch((error) => console.log(error));
})();
