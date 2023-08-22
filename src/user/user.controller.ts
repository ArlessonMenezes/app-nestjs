import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Roles } from 'src/utils/decoratos/role.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeUserEnum } from './enum/type-user.enum';
import { UserService } from './user.service';
import { idUser } from 'src/utils/decoratos/id-user.decorator';

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
  
  @Roles(TypeUserEnum.Admin, TypeUserEnum.Customer)
  @Put('/update')
  async updateUser(
    @idUser('idUser') idUser: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(idUser, updateUserDto);
  };

  @Get('/:name')
  async getOneUser(@Query('name') name: string) {
    return this.userService.getOneUser(name);
  };

  @Delete('/:name')
  async deleteUser(@Query('name') name: string) {
    return this.userService.deleteUser(name);
  };

  @Roles(TypeUserEnum.Admin)
  @Delete('/:idUser/inactivate')
  async inactivateUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.userService.inactivateUser(idUser);
  };
}
 