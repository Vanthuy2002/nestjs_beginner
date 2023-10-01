import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export default class UserServices {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(body: UserDto) {
    const user = await this.repository.save(body);
    plainToInstance(UserDto, user);
    delete user.password;
    return { message: 'Create user successfully!!', user };
  }
}
