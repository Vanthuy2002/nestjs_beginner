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

  async findAll(): Promise<{
    message: string;
    users: UserEntity[];
    totalUser: number;
  }> {
    const [users, totalUser] = await this.repository.findAndCount();

    const finalUser = users.map((user) => {
      delete user.password;
      return user;
    });
    return { message: 'Get all users ok', users: finalUser, totalUser };
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: { id },
    });
    delete user.password;
    return user;
  }

  async create(body: UserDto) {
    const user = await this.repository.save(body);
    plainToInstance(UserDto, user);
    delete user.password;
    return { message: 'Create user successfully!!', user };
  }

  async update(id: number, body: UserDto) {
    const updatedUser = await this.repository.update({ id }, { ...body });
    plainToInstance(UserDto, updatedUser);
    return {
      message: 'Update user successfully!!',
      user: updatedUser,
    };
  }
}
