import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from 'auth/auth.service';

@Controller()
export class AppController {
  appService: AppService;
  constructor(private authService: AuthService) {}

  //todo сделать возможность public получать
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
