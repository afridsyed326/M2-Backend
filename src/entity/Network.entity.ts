import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

// ENTITY
@Entity()
export class Network {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

}
