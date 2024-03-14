import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { CreateConcertDto } from 'src/concert/dto/createConcert.dto';
import { UpdateConcertDto } from 'src/concert/dto/updateConcert.dto';
import { ConcertService } from 'src/concert/concert.service';

@UseGuards(RolesGuard)
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    await this.concertService.create(file);
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

  @Roles(Role.Admin)
  @Post('createConcert')
  async createConcert(@Body() createConcertDto: CreateConcertDto) {
    return await this.concertService.createConcert(
      createConcertDto.concertname,
      createConcertDto.concertdetail,
      createConcertDto.maxreservation,
      createConcertDto.concertSchedule,
      createConcertDto.concertLocation,
      createConcertDto.seatInformation,
      // createConcertDto.concertImage,
      createConcertDto.concertCategory,
    );
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    await this.concertService.update(id, updateConcertDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.concertService.delete(id);
  }
}
