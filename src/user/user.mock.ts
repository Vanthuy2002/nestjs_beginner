import { UserDto } from './user.dto';

export class UserMock {
  createUser(body: UserDto): UserDto {
    return { ...body };
  }
}
