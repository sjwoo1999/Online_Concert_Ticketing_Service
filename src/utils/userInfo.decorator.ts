import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : null;
  },
);
export function UserInfoDto(): (
  target: import('../user/user.controller').UserController,
  propertyKey: 'getUserInfo',
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
