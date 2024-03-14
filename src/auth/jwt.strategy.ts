import _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { ConcertService } from 'src/concert/concert.service';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly concertService: ConcertService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest를 작성하는 방법 중 하나이다.
      // jwt로 생성해서 클라이언트 측으로 보냈던 토큰 값을
      // Header에 Bearer Token 값으로 실어 보내야 (요청해야)
      // 서버에서 해당 토큰을 받아 검사할 수 있다.

      ignoreExpiration: false,

      // 토큰이 만료되었는지 검사를 하게 되는데
      // 해당 속성을 true로 설정하면 만료되더라도 바로 strategy에서 에러를 리턴하지 않도록 해준다.
      // 만약 false로 설정해주게 되면, 이는 JWT가 만료되지 않았음을 보증하는 책임을 PASSPORT 모듈에 위임하게 된다.
      // 즉, 만약 만료된 JWT를 받았을 경우, request는 거부되고 401 Unauthorized response를 보낼 것이다.

      secretOrKey: configService.get('JWT_SECRET_KEY'),

      // secret key는 외부에 노출되면 안 되는 값이므로 환경변수나 config로 빼서 사용하는 것을 권장한다.
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    if (_.isNil(user)) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    const concert = await this.concertService.findByConcertName(
      payload.concertname,
    );
    if (_.isNil(concert)) {
      throw new NotFoundException('해당하는 콘서트를 찾을 수 없습니다.');
    }

    return user;
  }
}
