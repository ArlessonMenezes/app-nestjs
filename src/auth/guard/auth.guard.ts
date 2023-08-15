import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserTypeEnum } from "src/user/enum/role.enum.";
import { jwtConstant } from "src/utils/constants/jwt.constant";
import { ROLES_KEY } from "src/utils/decoratos/role.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserTypeEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().getHandler;

    const loginPayload = await this.jwtService.verifyAsync(authorization, { secret: process.env.JWT_SECRET }
      ).catch(() => undefined);
  
    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser)
  }
}