import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConcertDto {
  // concertName

  @IsString()
  @IsNotEmpty({ message: '콘서트명을 입력해주세요.' })
  concertname: string;

  // concertdetail

  @IsString()
  @IsNotEmpty({ message: '콘서트 상세 정보를 입력해주세요.' })
  concertdetail: string;

  // maxReservation

  @IsString()
  @IsNotEmpty({ message: '최대 예약 가능 인원수를 입력해주세요.' })
  maxreservation: number;

  // concertSchedule

  @IsString()
  @IsNotEmpty({ message: '콘서트 진행 스케줄을 입력해주세요.' })
  concertSchedule: string;

  // concertLocation

  @IsString()
  @IsNotEmpty({ message: '콘서트 진행 위치를 입력해주세요.' })
  concertLocation: string;

  // seatInformation

  @IsString()
  @IsNotEmpty({ message: '콘서트 좌석 정보를 입력해주세요.' })
  seatInformation: string;

  // concertImage

  // concertCategory

  @IsString()
  @IsNotEmpty({ message: '콘서트 카테고리를 입력해주세요.' })
  concertCategory: string;
}
