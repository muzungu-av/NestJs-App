import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('/private')
  getPrivateHello(): string {
    return this.appService.getPrivateHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    winstonLogger.info('Successful user authorisation');
    return this.authService.login(req.user);
  }
}
