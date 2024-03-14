import { Role } from 'src/user/types/userRole.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  } // Guard에 Reflector를 주입 | Super에 대해서는 추가 학습 필요

  async canActivate(context: ExecutionContext) {
    // Guard에 주입받은 Reflector를 이용하여 메타데이터 리스트를 얻는다.
    const authenticated = await super.canActivate(context);
    if (!authenticated) {
      return false;
    }

    // @Roles(Role.Admin) -> 'roles' -> [Role.Admin]
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      // requiredRoles가 아니면 true를 리턴하고 진행한다. (?)
      return true;
    }

    // 실행 컨텍스트로부터 request 객체를 얻고, request 객체에 포함된 user 객체를 얻는다.
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
