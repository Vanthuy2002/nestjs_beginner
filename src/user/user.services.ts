import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser, IUserParams, UserDto } from './user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export default class UserServices {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async findAll({
    limit,
    search,
    page,
  }: IUserParams): Promise<IUser<UserEntity[]>> {
    page = Number(page);
    limit = Number(limit);
    const [users, totalUser] = await this.repository.findAndCount({
      where: { fullname: Like(`%${search}%`) },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPage = Math.ceil(totalUser / limit);

    const finalUser = users.map((user) => {
      delete user.password;
      return user;
    });
    if (finalUser.length > 0) {
      return {
        message: 'Get all users ok',
        statusCode: 200,
        totalUser,
        page,
        limit,
        totalPage,
        users: finalUser,
      };
    }
    return {
      message: 'No user was found',
      statusCode: 200,
      users: [],
    };
  }

  async findById(id: number) {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (user) {
      delete user.password;
      return user;
    }
    return { message: 'Not found user' };
  }

  async create(body: UserDto): Promise<IUser<UserEntity>> {
    const user = await this.repository.save(body);
    plainToInstance(UserDto, user);
    delete user.password;
    return { message: 'Create user successfully!!', statusCode: 201, user };
  }

  async update(id: number, body: UserDto): Promise<IUser<UpdateResult>> {
    const updatedUser = await this.repository.update({ id }, { ...body });
    plainToInstance(UserDto, updatedUser);
    if (updatedUser) {
      return {
        message: 'Update user successfully!!',
        statusCode: 201,
        user: updatedUser,
      };
    }
    return {
      message: 'Can not update user',
      statusCode: 400,
    };
  }

  async delete(id: number): Promise<IUser> {
    const isExist = await this.repository.findOne({ where: { id } });
    if (isExist) {
      await this.repository.delete(id);
      return { message: 'Delete successfully!!', statusCode: 200 };
    }
    return { message: 'Not found user to delete', statusCode: 404 };
  }
}
