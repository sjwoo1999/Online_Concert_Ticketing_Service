import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    default: 'nickname',
  })
  nickname: string;

  @Column({ type: 'varchar', nullable: false, default: 'User' })
  role: string;

  @Column({ type: 'int', default: 0 })
  point: number;
}
