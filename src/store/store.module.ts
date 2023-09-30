import { DynamicModule, Module } from '@nestjs/common';
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
export class StoreModule {
  static forRoot(config: storeConfig): DynamicModule {
    return {
      module: StoreModule,
      providers: [
        StoreServices,
        {
          provide: 'STORE_CONFIG',
          useValue: config,
        },
      ],
      exports: [StoreServices],
    };
  }
}
