import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Coin } from "./Coin.entity";

// ENUMS
export enum COIN_TRANSACTION_TYPE {
    DEPOSIT = "DEPOSIT",
    TRANSFER = "TRANSFER",
    WITHDRAW = "WITHDRAW",
}

export enum TRANSACTION_DIRECTION {
    DEBIT = "DEBIT",
    CREDIT = "CREDIT",
}

export enum TRANSACTION_STATUS {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED",
}

// ENTITY
@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Coin, { eager: true })
    @JoinColumn()
    coin: Coin;

    @Column({
        type: "enum",
        enum: COIN_TRANSACTION_TYPE,
    })
    type: COIN_TRANSACTION_TYPE;

    @Column({
        type: "enum",
        enum: TRANSACTION_DIRECTION,
    })
    direction: TRANSACTION_DIRECTION;

    @Column({ default: 0 })
    amount: number;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    hash: string;

    @Column({
        enumName: "transaction_status",
        default: TRANSACTION_STATUS.PENDING,
    })
    status: TRANSACTION_STATUS;

    @Column({ default: 0 })
    fee: number;
}
