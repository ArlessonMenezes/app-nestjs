import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'date_of_birth', nullable: true})
  dateOfBirth: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
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