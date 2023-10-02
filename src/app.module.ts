import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import NoteModule from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/db.module';
import UserModule from './user/user.module';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    NoteModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
