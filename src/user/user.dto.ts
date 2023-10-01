import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  @Expose()
  password: string;

  @IsNumber()
  @Expose()
  age: number;
}

export interface IUser<T = void> {
  message?: string;
  user?: T;
  totalPage?: number;
  size?: number;
}
