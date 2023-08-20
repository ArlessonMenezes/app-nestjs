import { SetMetadata } from '@nestjs/common';
import { TypeUserEnum } from 'src/user/enum/type-user.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TypeUserEnum[]) => SetMetadata(ROLES_KEY, roles);