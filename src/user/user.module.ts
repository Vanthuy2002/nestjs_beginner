import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { UserRepository } from './user.repo';
import { StoreModule } from '@app/store/store.module';

@Module({
  imports: [StoreModule],
  controllers: [UserController],
  providers: [
    UserServices,
    {
      provide: 'CUSTOM_PROVIDERS',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
