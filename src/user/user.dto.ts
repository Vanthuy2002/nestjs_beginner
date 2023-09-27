import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UserDto extends BaseDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  firstName?: string;

  @Expose()
  @Transform(({ obj }) => `${obj.name} ${obj.firstName}`)
  userName?: string;
  // Tranforms để lấy các trường khác để làm việc gì đó trên trường được chỉ định
  // O đây là việc gộp hai trường name vs firstName để tạo ra trường username

  @IsNumber()
  @Expose()
  age: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  sex: string;
}
