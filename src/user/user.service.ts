import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repo';
import { StoreServices } from '@app/store/store.services';

export const fakeData: UserDto[] = [
  { id: 1, name: 'Thuy Nguyen', age: 21, sex: 'male' },
  { id: 2, name: 'Kim Ngan', age: 12, sex: 'female' },
];

@Injectable()
export class UserServices {
  constructor(
    @Inject('CUSTOM_PROVIDERS') private readonly userRepo: UserRepository,
    private readonly storeServices: StoreServices
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
    this.storeServices.saveData(body);
    return { message: 'Create user successfully!!' };
  }
}
