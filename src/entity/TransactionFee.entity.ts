import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Coin } from "./Coin.entity";
import { COIN_TRANSACTION_TYPE } from "./Transaction.entity";

export enum FEE_TYPE {
    AMOUNT = "amount",
    PERCENTAGE = "percentage",
}

@Entity()
export class TransactionFee extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Coin, { eager: true })
    @JoinColumn()
    coin: Coin;

    @Column({ enumName: "transaction_type", nullable: true })
    transactionType: COIN_TRANSACTION_TYPE;

    @Column({ enumName: "fee_type" })
    type: FEE_TYPE;

    @Column()
    fee: number;
}
