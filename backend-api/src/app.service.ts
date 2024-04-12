import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPublicHello(): string {
    return 'Maliphaion.com';
  }
}
