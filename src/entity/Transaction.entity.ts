import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';
// import { Wallet } from './wallet.model';
// import { Order } from './order.model';

// ENUMS
enum COIN_TRANSACTION_TYPE {
    DEPOSIT = 'DEPOSIT',
    TRANSFER = 'TRANSFER',
    WITHDRAW = 'WITHDRAW',
}

enum TRANSACTION_DIRECTION {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

// ENTITY
@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true }) // Assuming User is another entity
  @JoinColumn()
  user: User;

  @Column({ enum: COIN_TRANSACTION_TYPE })
  type: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  address: string;

  @Column({ enum: TRANSACTION_DIRECTION })
  direction: string;

  @Column({ nullable: true })
  hash: string;

  @Column({ enum: TRANSACTION_STATUS, default: TRANSACTION_STATUS.COMPLETED })
  status: string;

  @Column({ default: 0 })
  fee: number;

  @Column({ default: null })
  deletedAt: Date;
}
