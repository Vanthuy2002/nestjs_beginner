import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import UserServices from './user.services';
import { IUser, UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { logger } from '@app/utils/helpers';

@Controller('user')
export default class UserController {
  constructor(private readonly services: UserServices) {}

  @Get()
  async getAllUsers() {
    try {
      const { message, users, totalUser } = await this.services.findAll();
      return { message, totalUser, users };
    } catch (err) {
      logger(err);
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserEntity> {
    try {
      const user = this.services.findById(id);
      return user;
    } catch (err) {
      logger(err);
    }
  }

  @Post('create')
  async createUser(
    @Body() body: UserDto
  ): Promise<IUser<UserDto & UserEntity>> {
    try {
      const { message, user } = await this.services.create(body);
      return { message, user };
    } catch (err: any) {
      logger(err);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserDto
  ): Promise<IUser> {
    try {
      const { message } = await this.services.update(id, body);
      return { message };
    } catch (err) {
      logger(err);
    }
  }
}
