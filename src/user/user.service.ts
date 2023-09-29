import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { plainToClass } from 'src/common/helper';
import { UserRepository } from './user.repo';

export const fakeData: UserDto[] = [
  { id: 1, name: 'Thuy Nguyen', age: 21, sex: 'male' },
  { id: 2, name: 'Kim Ngan', age: 12, sex: 'female' },
];

@Injectable()
export class UserServices {
  constructor(
    @Inject('CUSTOM_PROVIDERS') private readonly userRepo: UserRepository
  ) {}

  getAllUser(): UserDto[] {
    const hello = this.userRepo.helloDB;
    console.log('🚀 ~ UserServices ~ getAllUser ~ hello:', hello);
    return fakeData;
  }

  getUserById(id: number): UserDto {
    const user = fakeData.find((item) => item.id === id);
    return user;
  }

  createUser(body: UserDto): object {
    body.createdAt = new Date();
    body.updatedAt = new Date();
    const finalUser = plainToClass<UserDto>(UserDto, body);
    fakeData.push(finalUser);
    return { message: 'Create user successfully!!' };
  }
}
