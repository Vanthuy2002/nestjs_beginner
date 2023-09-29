import { Inject, Injectable } from '@nestjs/common';
import { storeConfig } from './store.module';
import * as fs from 'node:fs';

@Injectable()
export class StoreServices {
  constructor(@Inject('STORE_CONFIG') private readonly storeCfg: storeConfig) {
    if (!fs.existsSync(this.storeCfg.dirname)) {
      fs.mkdirSync(this.storeCfg.dirname);
    }
  }
  saveData(data: any) {
    fs.appendFileSync(
      `${this.storeCfg.dirname}/${this.storeCfg.filename}`,
      JSON.stringify(data)
    );
  }
}
