import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import AuthEntity from './auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'auth_nestjs',
      entities: [AuthEntity],
      synchronize: true,
      timezone: '+07:00',
    }),
    AuthModule,
  ],
})
export class AppModule {}
