import { BaseEntyti } from '@app/common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntyti {
  @Column({ length: 255 })
  fullname: string;

  @Column()
  age: number;

  @Column()
  password: string;
}
