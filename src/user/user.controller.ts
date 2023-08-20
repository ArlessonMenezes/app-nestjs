import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/utils/decoratos/role.decorator';
import { TypeUserEnum } from './enum/type-user.enum';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ){}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  };

  @Roles(TypeUserEnum.Admin)
  @Get()
  async getUsers() {
    return this.userService.getusers();
  };
  
  @Put('/:name')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  };

  @Get('/:name')
  async getOneUser(@Query('name') name: string) {
    return this.userService.getOneUser(name);
  };

  @Delete('/:name')
  async deleteUser(@Query('name') name: string) {
    return this.userService.deleteUser(name);
  };
}
