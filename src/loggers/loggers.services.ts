import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class LoggerServices {
  count = 0;

  logger(): number {
    this.count++;
    return this.count;
  }
}
