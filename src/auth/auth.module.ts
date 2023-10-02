import { Module } from '@nestjs/common';
import AuthController from './auth.controllers';
import AuthServices from './auth.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthEntity from './auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity])],
  controllers: [AuthController],
  providers: [AuthServices],
})
export class AuthModule {}
