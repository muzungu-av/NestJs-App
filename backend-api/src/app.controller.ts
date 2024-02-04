import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

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
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
/*
c;curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '"username": "john", "password": "903"}' ; echo ""

curl -X GET http://localhost:3000/api/private -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcwNDg2NjEsImV4cCI6MTcwNzEzNTA2MX0.BGaeeu7p56UTLD5O6_hF39S-3Rbht9HuqPd7ZDyJfLQ"

curl -X GET GET http://localhost:3000/api -H "Content-Type: application/json"
*/
