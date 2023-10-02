import AuthEntity from '@app/auth/auth.entity';
import { BaseEntyti } from '@app/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('note')
export default class NoteEntity extends BaseEntyti {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => AuthEntity)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_note',
  })
  user: AuthEntity;
}
