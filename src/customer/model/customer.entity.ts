import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  idCustomer: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatet_at: Date;
}