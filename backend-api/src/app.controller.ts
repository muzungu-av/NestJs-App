import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Head,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { winstonLogger } from 'winston.logger';

@Controller('/api')
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getPublicHello();
  }

  /**
   * Проверка JWT токена
   * Вернет 200 в случае успеха
   * 401 Unauthorized или 403 Forbidden в обратном случае.
   */
  @UseGuards(JwtAuthGuard)
  @Head('/check_me_out')
  checkJwt(): void {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    winstonLogger.info('Successful user authorisation');
    return this.authService.login(req.user);
  }
}
