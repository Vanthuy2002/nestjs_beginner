import { Module } from '@nestjs/common';
import { StoreServices } from './store.services';

export interface storeConfig {
  dirname: string;
  filename: string;
}

@Module({
  controllers: [],
  providers: [
    StoreServices,
    {
      provide: 'STORE_CONFIG',
      useValue: {
        dirname: 'store',
        filename: 'data.json',
      } as storeConfig,
    },
  ],
  exports: [StoreServices],
})
export class StoreModule {}
