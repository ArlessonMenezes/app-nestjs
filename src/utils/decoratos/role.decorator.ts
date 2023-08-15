import { SetMetadata } from "@nestjs/common";
import { UserTypeEnum } from "src/user/enum/role.enum.";
import { User } from "src/user/model/user.entity";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeEnum[]) => SetMetadata(ROLES_KEY, roles)