import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TypeUserEnum } from '../enum/type-user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  typeUser: string;

  @Column({ default: 'ativo' })
  status: string;

  @Column({ nullable: true })
  date_inactivation: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatet_at: Date;
}