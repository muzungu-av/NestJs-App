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

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    winstonLogger.info(`User login/password attempt: ${email} - ${password}`);
    winstonLogger.info(`password DB: ${user.password}`);
    const isPasswordMatch = await this.comparePassword(password, user.password);
    if (isPasswordMatch) {
      winstonLogger.info(`Find Trusted User. password: ${user.password}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      winstonLogger.info(
        `User Not Found or pass not valid: ${email} - ${password}`,
      );
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
