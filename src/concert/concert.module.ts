import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';
import { Concert } from './entities/concert.entity';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Concert])],
  providers: [ConcertService],
  controllers: [ConcertController],
  exports: [ConcertService],
})
export class ConcertModule {}
