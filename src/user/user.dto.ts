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
  totalUser?: number;
  size?: number;
  statusCode?: number;
  users?: any[];
  page?: number;
  limit?: number;
}

export interface IUserParams {
  page?: number;
  limit?: number;
  search?: string;
}
