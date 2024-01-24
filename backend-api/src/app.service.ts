import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPublicHello(): string {
    return 'Это публичная страница';
  }
  getPrivateHello(): string {
    return 'Это приватная страница';
  }
}
