import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import AuthEntity from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import AuthDto from './auth.dto';
import { hassPassword } from '@app/utils/helpers';

@Injectable()
export default class AuthServices {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly repository: Repository<AuthEntity>
  ) {}

  async registerServices(body: AuthDto) {
    const { email, password } = body;
    const isExist = await this.repository.findOne({ where: { email } });
    if (isExist) {
      return {
        message: 'Email adready exists',
      };
    }
    const hash = await hassPassword(password);
    const finalData = { email, password: hash };
    await this.repository.save(finalData);
    delete finalData.password;

    return {
      message: 'Register successfully!!',
      user: finalData,
    };
  }
}
