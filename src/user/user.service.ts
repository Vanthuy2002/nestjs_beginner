import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { plainToClass } from 'src/common/helper';

export const fakeData: UserDto[] = [
  { id: 1, name: 'Thuy Nguyen', age: 21, sex: 'male' },
  { id: 2, name: 'Kim Ngan', age: 12, sex: 'female' },
];

@Injectable()
export class UserServices {
  getAllUser(): UserDto[] {
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
    console.log('🚀 ~ UserServices ~ createUser ~ finalUser:', finalUser);
    fakeData.push(finalUser);
    return { message: 'Create user successfully!!' };
  }
}
