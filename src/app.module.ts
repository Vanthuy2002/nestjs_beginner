import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'auth_nestjs',
      entities: [UserEntity],
      synchronize: true,
      timezone: '+07:00',
    }),
    UserModule,
  ],
})
export class AppModule {}
