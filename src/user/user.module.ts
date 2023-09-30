import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { UserRepository } from './user.repo';
import { StoreModule } from '@app/store/store.module';
import { LoggerServices } from '@app/loggers';
import { SecurityServices } from '@app/security';

@Module({
  imports: [StoreModule.forRoot({ dirname: 'store', filename: 'user.json' })],
  controllers: [UserController],
  providers: [
    UserServices,
    {
      provide: 'CUSTOM_PROVIDERS',
      useClass: UserRepository,
    },
    LoggerServices,
    SecurityServices,
  ],
})
export class UserModule {}
