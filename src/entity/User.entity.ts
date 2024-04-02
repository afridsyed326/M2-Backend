import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

enum USER_ACCOUNT_TYPES {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: USER_ACCOUNT_TYPES,
        default: USER_ACCOUNT_TYPES.USER
      })
    type: string

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    walletAddress: string

}
