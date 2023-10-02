import { BaseEntyti } from '@app/common/base.entity';
import NoteEntity from '@app/notes/note.entity';
import { Column, Entity, Unique, OneToMany } from 'typeorm';

@Entity('authen')
@Unique('authen', ['email'])
export default class AuthEntity extends BaseEntyti {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => NoteEntity, (note) => note.user)
  note: NoteEntity[];
}
