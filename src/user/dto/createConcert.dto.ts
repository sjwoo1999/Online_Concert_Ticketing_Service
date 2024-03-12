import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConcertDto {
  // concertName

  @IsString()
  @IsNotEmpty({ message: '콘서트명을 입력해주세요.' })
  concertName: string;

  // maxReservation

  @IsString()
  @IsNotEmpty({ message: '최대 예약 가능 인원수를 입력해주세요.' })
  maxReservation: number;

  // currentReservation

  @IsString()
  @IsNotEmpty({ message: '현재 예약한 인원수를 입력해주세요.' })
  currentReservation: number;

  // date

  @IsString()
  @IsNotEmpty({ message: '콘서트 진행 날짜를 입력해주세요.' })
  date: Date;

  // time

  @IsString()
  @IsNotEmpty({ message: '콘서트 진행 시간을 입력해주세요.' })
  time: Date;

  // detail

  @IsString()
  @IsNotEmpty({ message: '콘서트 상세 정보를 입력해주세요.' })
  detail: string;
}
