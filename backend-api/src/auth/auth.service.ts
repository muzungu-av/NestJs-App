import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { winstonLogger } from 'winston.logger';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // async hashPassword(password: string): Promise<string> {
  //   const saltRounds = 3; // кол-во "соли" для хеширования
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);
  //   return hashedPassword;
  // }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
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
    const { _id, email } = user._doc;
    winstonLogger.info(`Try login User: ${email}, id: ${_id}`);
    const payload = { userId: _id, email: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
