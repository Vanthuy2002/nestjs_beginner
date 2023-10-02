import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import UserServices from './user.services';
import { IUser, IUserParams, UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { logger } from '@app/utils/helpers';

@Controller('user')
export default class UserController {
  constructor(private readonly services: UserServices) {}

  @Get()
  async getAllUsers(@Query() params: IUserParams) {
    const { page = 1, limit = 5, search = '' } = params;
    try {
      const info = await this.services.findAll({ page, limit, search });
      return { ...info };
    } catch (err) {
      logger(err);
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
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
      const { message, user, statusCode } = await this.services.create(body);
      return { message, statusCode, user };
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
      const { message, statusCode } = await this.services.update(id, body);
      return { message, statusCode };
    } catch (err) {
      logger(err);
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    try {
      const { message, statusCode } = await this.services.delete(id);
      return { message, statusCode };
    } catch (err) {
      logger(err);
    }
  }
}
