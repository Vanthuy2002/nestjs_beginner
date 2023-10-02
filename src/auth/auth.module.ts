import { Module } from '@nestjs/common';
import AuthController from './auth.controllers';
import AuthServices from './auth.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthEntity from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt';

@Module({
  imports: [TypeOrmModule.forFeature([AuthEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthServices, JwtStrategy],
})
export class AuthModule {}
