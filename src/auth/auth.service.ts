import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StatusUserEnum } from 'src/user/enum/status-user.enum';
import { UserService } from 'src/user/user.service';

import { LoginPayloadDto } from './dto/login-payload.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) {
      throw new NotFoundException('E-mail or Password invalid');
    };

    if (user.date_inactivation !== null || user.status === StatusUserEnum.Inativo) {
      throw new BadRequestException('Inactive user.');
    }

    const {
      created_at, password, updatet_at, 
      avatar, date_inactivation, ...userReturn
    } = user;

    return {
      user: userReturn,
      access_token: this.jwtService.sign({...new LoginPayloadDto(user)}),
    };
  };
}
