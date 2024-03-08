import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, nickname: string) {
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
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'nickname', 'point'],
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

      user.point = user.point + 100;
      await this.userRepository.save(user);
    }

    // nickname 값 존재 여부 검사
    if (!user.nickname) {
      throw new UnauthorizedException('사용자 닉네임 정보가 없습니다.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOneBy({ nickname });
  }

  async getPoint(
    email: string,
    password: string,
    nickname: string,
    point: number,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ['email', 'password', 'nickname', 'point'],
      where: { point },
    });

    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    return user;
  }

  async getUserInfo(
    email: string,
    password: string,
    nickname: string,
    point: number,
  ): Promise<User[]> {
    const user = await this.userRepository.findOne({
      select: ['email', 'password', 'nickname', 'point'],
      where: { email, point },
    });

    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    return [user];
  }
}
