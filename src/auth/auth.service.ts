import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.getUserByEmail(signInDto.email);

    const isMatch = compare(signInDto.password, user?.password);

    if (!user || !isMatch) {
      throw new UnauthorizedException('email or password is invalid.');
    };

    const payload = { sub: user.idUser, typeUser: user.typeUser };

    return {
      user: { name: user.name, user: user.typeUser },
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
