import { Module } from '@nestjs/common';
import NoteEntity from './note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
})
export default class NoteModule {}
