import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Concert } from './entities/concert.entity';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  providers: [ConcertService],
  controllers: [ConcertController],
})
export class ConcertModule {}
