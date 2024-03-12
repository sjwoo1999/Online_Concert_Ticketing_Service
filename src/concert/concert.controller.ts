import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

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

import { CreateConcertDto } from 'src/user/dto/createConcert.dto';
import { UpdateConcertDto } from 'src/user/dto/updateConcert.dto';
import { UserService } from 'src/user/user.service';
import { ConcertService } from './concert.service';

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
