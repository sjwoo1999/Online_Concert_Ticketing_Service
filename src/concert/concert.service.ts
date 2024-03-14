import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  HttpException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateConcertDto } from 'src/concert/dto/createConcert.dto';
import { UpdateConcertDto } from 'src/concert/dto/updateConcert.dto';
import { User } from '../user/entities/user.entity';
import { Concert } from './entities/concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
    @InjectRepository(User)
    private userRepositroy: Repository<User>,
  ) {}

  async findAllConcert(): Promise<Concert[]> {
    return await this.concertRepository.find({
      select: ['id', 'concertname'],
    });
  }

  async findOne(id: number) {
    return await this.verifyConcertById(id);
  }

  async create(file: Express.Multer.File) {
    if (!file.originalname.endsWith('.png')) {
      throw new BadRequestException('PNG 파일만 업로드 가능합니다.');
    }
  }

  /* 
    “concertName”
    “concertDetail”
    “maxReservation”
    “concertSchedule”
    “concertLocation”
    “seatInformation”
    “concertImage”
    “concertCategory”
  */

  async createConcert(
    concertname: string,
    concertdetail: string,
    maxreservation: number,
    concertschedule: string,
    concertlocation: string,
    seatinformation: string,
    //  concertImage: image,
    concertcategory: string,
  ): Promise<Concert> {
    const existingConcert = await this.findByConcertName(concertname);

    if (existingConcert === undefined) {
      // existingConcert 값이 undefined가 아니라면 로직 실행
    } else {
      throw new ConflictException(
        '이미 해당 이름으로 등록된 콘서트가 존재합니다!',
      );
    }

    await this.concertRepository.save({
      concertname,
      concertdetail,
      maxreservation,
      concertschedule,
      concertlocation,
      seatinformation,
      // concertImage,
      concertcategory,
    });

    return;
  }

  async findByConcertName(concertname: string) {
    const concert = await this.concertRepository.findOneBy({ concertname });

    if (_.isNil(concert)) {
      throw new Error('');
    }
  }

  async update(id: number, updateConcertDto: UpdateConcertDto) {
    // 1. 콘서트 정보 조회
    const existingConcert = await this.concertRepository.findOneBy({ id });

    // 2. 콘서트 존재 여부 확인
    if (!existingConcert) {
      throw new Error('존재하지 않는 콘서트입니다!');
    }

    // 3. 업데이트 데이터 병합
    Object.assign(existingConcert);

    // 4. 콘서트 정보 업데이트
    await this.concertRepository.save(existingConcert);

    // 5. 업데이트된 정보 반환
    return existingConcert;
  }

  async delete(id: number) {
    await this.verifyConcertById(id);
    await this.concertRepository.delete({ id });
  }

  private async verifyConcertById(id: number) {
    const concert = await this.concertRepository.findOneBy({ id });
    if (_.isNil(concert)) {
      throw new NotFoundException('존재하지 않는 콘서트입니다.');
    }

    return concert;
  }
}
