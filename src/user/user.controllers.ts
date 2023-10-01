import { Controller, Post, Body } from '@nestjs/common';
import UserServices from './user.services';
import { UserDto } from './user.dto';

@Controller('user')
export default class UserController {
  constructor(private readonly services: UserServices) {}

  @Post('create')
  async createUser(@Body() body: UserDto) {
    try {
      const { message, user } = await this.services.create(body);
      return { message, user };
    } catch (err: any) {
      console.log(err.toString());
    }
  }
}
