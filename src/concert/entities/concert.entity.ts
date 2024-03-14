import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  // detail
  @Column({
    type: 'varchar',
    select: false,
    nullable: false,
  })
  concertDetail: string;

  // maxReservation
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  maxreservation: number;

  // currentReservation
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  currentreservation: number;

  // date
  @Column({ type: 'varchar' })
  concertSchedule: string;
}
