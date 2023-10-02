import { BaseEntyti } from '@app/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('authen')
export default class AuthEntity extends BaseEntyti {
  @Column()
  email: string;

  @Column()
  password: string;
}
