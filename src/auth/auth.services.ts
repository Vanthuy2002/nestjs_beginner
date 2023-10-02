import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import AuthEntity from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import AuthDto, { IAuthResponse } from './auth.dto';
import { comparePassword, hassPassword } from '@app/utils/helpers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthServices {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly repository: Repository<AuthEntity>,
    private readonly jwtServices: JwtService,
    private readonly configService: ConfigService
  ) {}

  async generateJwtString(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return await this.jwtServices.signAsync(payload, {
      expiresIn: '2h',
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async registerServices(body: AuthDto) {
    const { email, password } = body;

    const hash = await hassPassword(password);
    const finalData = { email, password: hash };
    await this.repository.save(finalData);
    delete finalData.password;

    return {
      message: 'Register successfully!!',
      user: finalData,
    };
  }

  async loginServices(body: AuthDto): Promise<IAuthResponse<AuthDto>> {
    const { email, password } = body;
    const user = await this.repository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });
    if (!user) {
      throw new ForbiddenException('Email or password not correct');
    }

    const isMatched = await comparePassword(user.password, password);
    delete user.password;
    const accessToken = await this.generateJwtString(user.id, user.email);
    if (isMatched) {
      return {
        message: 'Login sucessfully!!',
        user,
        accessToken,
      };
    }
    throw new ForbiddenException('Email or password not correct');
  }
}
