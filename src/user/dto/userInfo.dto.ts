import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Expose, Exclude } from 'class-transformer';

export class UserInfoDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  userName: string;

  @Exclude()
  password: string;

  @Expose()
  point: number;
}
