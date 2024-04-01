import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// ENTITY
@Entity()
export class Coin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    symbol: string;
}
