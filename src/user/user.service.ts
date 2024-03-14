import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Concert } from '../concert/entities/concert.entity';
import { Role } from './types/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    confirmPassword: string,
    nickname: string,
    role: Role,
    point: number,
  ) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);

    await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
      role,
      point,
    });

    return {
      message: '회원가입에 성공했습니다.',
      success: true,
      data: { email, nickname, role, point },
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    if (user) {
      console.log('사용자가 존재합니다~');

      if (isNaN(user.point)) {
        throw new Error('포인트 값이 유효하지 않습니다.');
      }

      console.log('포인트 값이 유효합니다~');
    }

    // nickname 값 존재 여부 검사
    if (!user.nickname) {
      throw new UnauthorizedException('사용자 닉네임 정보가 없습니다.');
    }

    console.log('사용자 닉네임 정보가 존재합니다~');

    const payload = { email, sub: user.id };
    return {
      message: '로그인에 성공했습니다.',
      success: true,
      data: { access_token: this.jwtService.sign(payload) },
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOneBy({ nickname });
  }

  async getPoint(point: number) {
    return await this.userRepository.findOneBy({ point });
  }

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne({
      select: ['email', 'nickname', 'point'],
      where: { id: userId },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다');
    }
  }
}
