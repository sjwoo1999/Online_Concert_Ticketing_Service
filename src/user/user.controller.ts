import * as userInfoDecorator from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { UserInfoDto } from './dto/userInfo.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() loginDto: LoginDto) {
    return await this.userService.register(loginDto.email, loginDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@userInfoDecorator.UserInfo() user: User) {
    return { email: user.email };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('point')
  getPoint(@userInfoDecorator.UserInfo() user: User) {
    return { point: user.point ?? 0 };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  getUserInfo(@userInfoDecorator.UserInfo() userInfoDto: UserInfoDto) {
    return { email: userInfoDto.email, point: userInfoDto.point ?? 0 };
  }
}
