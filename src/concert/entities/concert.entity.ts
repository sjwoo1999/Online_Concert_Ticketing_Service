import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../user/types/userRole.type';

@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  // concertName
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    default: 'concertName',
  })
  concertname: string;

  // maxReservation
  @Column({
    type: 'int',
    default: 0,
  })
  maxreservation: number;

  // currentReservation
  @Column({
    type: 'int',
    default: 0,
  })
  currentreservation: number;

  // date
  @Column({ type: 'date' })
  date: Date;

  // time
  @Column({ type: 'time' })
  // time: Time;

  // detail
  @Column({
    type: 'varchar',
    // select: false, - 천천히 생각해봐야 할 듯
    default: 'detail',
  })
  detail: string;
}
