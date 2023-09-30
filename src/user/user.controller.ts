import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LoggerServices } from '@app/loggers';
import { UserServices } from './user.service';
import { UserDto } from './user.dto';
import { SecurityServices } from '@app/security';

@Controller('user')
export class UserController {
  constructor(
    private readonly userServices: UserServices,
    private readonly logging: LoggerServices,
    private readonly security: SecurityServices
  ) {}

  @Get()
  getAllUser(): number {
    return this.logging.logger();
    // return this.userServices.getAllUser();
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
