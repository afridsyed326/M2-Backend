import "reflect-metadata"
import { DataSource, Transaction } from "typeorm"
import { config } from 'dotenv';
import { User } from "../entity/User.entity";
import { Coin } from "../entity/Coin.entity";
import { Network } from "../entity/Network.entity";

config();

(async () => {
    const entities = [User, Coin, Network, Transaction]
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
    })

    AppDataSource.initialize().then(async () => {

        // create a new coin
        const m2xCoin = new Coin()
        m2xCoin.name = 'M2X Token'
        m2xCoin.symbol = 'M2X'
        await AppDataSource.manager.save(m2xCoin);

        // create a new network for transaction
        const network = new Network()
        network.name = 'TRC/20'
        network.code = 'TRC_20'
        await AppDataSource.manager.save(network);


    
    }).catch(error => console.log(error))

})()
