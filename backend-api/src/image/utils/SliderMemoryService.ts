import { Injectable, Scope } from '@nestjs/common';
import { winstonLogger } from 'winston.logger';

/**
 * Slider memory service.
 *
 * Scope.DEFAULT - this is a singleton
 */
@Injectable({ scope: Scope.DEFAULT })
export class SliderMemoryService {
  private sharedMap: Map<string, any> = new Map<string, any>();

  getSharedObject() {
    return this.sharedMap;
  }

  setSharedObject(token: any) {
    // Добавление элементов в карту
    this.sharedMap.set(token, new Date().toString());
  }

  logMapContents() {
    for (const [key, value] of this.sharedMap) {
      winstonLogger.info(`>>>>>>>> Key: ${key}, Value: ${value}`);
    }
  }
}
