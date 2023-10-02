import { Controller, Body, Post } from '@nestjs/common';
import AuthServices from './auth.services';
import AuthDto from './auth.dto';
import { logger } from '@app/utils/helpers';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    try {
      const { message, user } = await this.authServices.registerServices(body);
      return { message, user };
    } catch (err) {
      logger(err);
    }
  }
}
