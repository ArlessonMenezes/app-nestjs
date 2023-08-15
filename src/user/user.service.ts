import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly UserRepository: Repository<User>,
  ){}

  async getUserByEmail(email: string) {
    return this.UserRepository.findOne({
      where: { email },
    });
  }
}
