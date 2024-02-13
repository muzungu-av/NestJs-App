import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { winstonLogger } from 'winston.logger';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    winstonLogger.info(`User login attempt: ${email}`);
    winstonLogger.info(`User password attempt: ${password}`);

    if (user && user.password === password) {
      winstonLogger.info(`Find User: ${user.email}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      winstonLogger.info('User Not Found');
    }
    return null;
  }

  async login(user: any) {
    winstonLogger.info(`Try login User: ${user.email}`);
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
