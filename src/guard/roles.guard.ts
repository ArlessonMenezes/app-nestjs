import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dto/login-payload.dto';
import { TypeUserEnum } from 'src/user/enum/type-user.enum';
import { ROLES_KEY } from 'src/utils/decoratos/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,  
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<TypeUserEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    
    if (!authorization) {
      throw new BadRequestException('Required a JWT Token.');
    }
    
    const loginPayload: LoginPayloadDto = 
      await this.jwtService.verifyAsync(authorization, {
         secret: process.env.JWT_SECRET
      });

    if (!loginPayload) {
      return false;
    };
    
    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}