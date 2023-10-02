import { Controller, Body, Post, ForbiddenException } from '@nestjs/common';
import AuthServices from './auth.services';
import AuthDto, { IAuthResponse } from './auth.dto';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    try {
      const { message, user } = await this.authServices.registerServices(body);
      return { message, user };
    } catch (err: any) {
      throw new ForbiddenException(err.message);
    }
  }

  @Post('login')
  async login(@Body() body: AuthDto): Promise<IAuthResponse<AuthDto>> {
    try {
      const userInfo = await this.authServices.loginServices(body);
      return { ...userInfo };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
