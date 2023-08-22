import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Roles } from 'src/utils/decoratos/role.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeUserEnum } from './enum/type-user.enum';
import { UserService } from './user.service';

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
  
  @Put('/:idUser/update')
  async updateUser(
    @Param('idUser', ParseIntPipe) idUSer: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(idUSer, updateUserDto);
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
 