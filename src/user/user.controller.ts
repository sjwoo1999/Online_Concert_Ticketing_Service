import { UserInfo } from 'src/utils/userInfo.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserInfoDto } from './dto/updateUserInfo.dto';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() signupDto: SignupDto) {
    return await this.userService.register(
      signupDto.email,
      signupDto.password,
      signupDto.confirmPassword,
      signupDto.nickname,
      signupDto.role,
      signupDto.point,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(RolesGuard)
  @Get('userInfo')
  async getUserInfo(@UserInfo() user: User) {
    return await this.userService.getUserInfo(user.id);
  }
}
