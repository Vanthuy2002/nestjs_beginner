import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export default class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResponse<T = void> {
  message?: string;
  user?: T;
  accessToken?: string;
}
