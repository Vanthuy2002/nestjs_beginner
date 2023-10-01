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
