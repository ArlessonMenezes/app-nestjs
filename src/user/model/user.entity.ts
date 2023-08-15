import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserTypeEnum } from "../enum/role.enum.";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  typeUser: UserTypeEnum;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;
}