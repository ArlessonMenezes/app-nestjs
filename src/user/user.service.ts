import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { TypeUserEnum } from './enum/type-user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    })

    if (user) {
      throw new BadRequestException('User already exists in database.'); 
    };

    const hashedPassword = await hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      typeUser: TypeUserEnum.Customer,
    });

    await this.userRepository.save(newUser);

    const { created_at, updatet_at, password, ...userReturn } = newUser;

    return userReturn;
  }

  async getusers() {
    return this.userRepository.find({
      select: ['idUser', 'name', 'email', 'avatar', 'typeUser'],
    });
  }

  async getOneUser(email: string) {
    const user = await this.findUserByEmail(email);
    
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    })

    if (!user) {
      throw new BadRequestException('User not found.'); 
    };

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const product = await this.findUserByEmail(updateUserDto.email);

    await this.userRepository.update(product.idUser, { ...updateUserDto });

    return { success: 'User updated.' };
  }

  async deleteUser(email: string) {
    const user = await this.findUserByEmail(email);

    await this.userRepository.remove(user);

    return { success: 'User deleted.' };

  }
}
