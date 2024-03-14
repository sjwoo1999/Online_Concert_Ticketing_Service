import { Role } from 'src/user/types/userRole.type';

import { SetMetadata } from '@nestjs/common';

// export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
