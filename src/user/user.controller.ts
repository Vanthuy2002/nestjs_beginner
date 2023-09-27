import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserServices } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get()
  getAllUser(): UserDto[] {
    return this.userServices.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.userServices.getUserById(id);
  }

  @Post()
  createUser(@Body() body: UserDto) {
    return this.userServices.createUser(body);
  }
}
