import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, hashSync } from 'bcrypt';
import { TypeUserEnum } from './enum/type-user.enum';
import { StatusUserEnum } from './enum/status-user.enum';

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

    const hashedPassword = hashSync(createUserDto.password, 10);

    const [dd, mm, yyyy] = createUserDto.dateOfBirth.split('/'); 
    
    const dateOfBirth = new Date(yyyy + '/' + mm + '/' + dd);
   
    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      dateOfBirth,
      password: hashedPassword,
      typeUser: TypeUserEnum.Customer,
      status: StatusUserEnum.Ativo,
      avatar: createUserDto.avatar,
    });

    await this.userRepository.save(newUser);

    const {
      created_at, updatet_at, password, 
      date_inactivation, ...userReturn
    } = newUser;

    return userReturn;
  }

  async getusers() {
    return this.userRepository.find({
      select: [
        'idUser', 'name', 'email',
        'avatar', 'typeUser', 'status',
        'date_inactivation',
      ],
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

  async findUserById(idUser: number) {
    const user = await this.userRepository.findOne({
      where: { idUser },
    });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async updateUser(idUser: number, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(idUser);

    const [dd, mm, yyyy] = updateUserDto.dateOfBirth.split('/');

    const dateOfBirth = new Date(yyyy + '/' + mm + '/' + dd);

    await this.userRepository.update(idUser, {dateOfBirth});

    await this.userRepository.save({
      idUser,
      ...updateUserDto,
    });

    return { success: 'User updated.' };
  }

  async deleteUser(email: string) {
    const user = await this.findUserByEmail(email);

    await this.userRepository.remove(user);

    return { success: 'User deleted.' };
  }

  async inactivateUser(idUser: number) {
    const user = this.userRepository.findOne({
      where: { idUser },
    });

    if (!user) throw new NotFoundException('User not found.');

    if ((await user).status === StatusUserEnum.Inativo) {
      throw new BadRequestException('User already inactivate.');
    };

    await this.userRepository.update(idUser, {
      date_inactivation: new Date(),
      status: 'inativo',
    });

    const returnEdit = {
      user: {
        name: (await user).name,
        email: (await user).email,
        id: (await user).idUser,
      },
      message: 'Inactivated user',
    }

    return {
      user: returnEdit.user,
      msg: returnEdit.message,
    };
  }
}
