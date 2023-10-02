import { Controller } from '@nestjs/common';
import AuthServices from './auth.services';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authServices: AuthServices) {}
}
