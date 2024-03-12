import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateConcertDto } from 'src/user/dto/createConcert.dto';
import { UpdateConcertDto } from 'src/user/dto/updateConcert.dto';
import { Concert } from './entities/concert.entity';
import { Roles } from 'src/auth/roles.decorator';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async findAll(): Promise<Concert[]> {
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

  async update(id: number, updateConcertDto: UpdateConcertDto) {
    await this.verifyConcertById(id);
    await this.concertRepository.update({ id }, updateConcertDto);
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
