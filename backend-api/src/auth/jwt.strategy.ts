import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configuration } from 'config/configuration';
import { winstonLogger } from 'winston.logger';
import { UserService } from 'user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().SECRET_KEY, //todo проверить изменение
    });
  }

  async validate(payload: any) {
    winstonLogger.info(
      `Validate JWT-token payload: ${JSON.stringify(payload)}`,
    );
    if (!payload || !payload.userId || !payload.email) {
      winstonLogger.warning(`Invalid token payload`);
      throw new UnauthorizedException('Invalid token payload');
    }
    const user = await this.usersService.findOne(payload.email);

    if (!user) {
      winstonLogger.warning(`Invalid User.email: ${payload.email}`);
      throw new UnauthorizedException('Invalid token payload');
    }
    winstonLogger.info(`User has been validated: ${user}`);
    return { userId: payload.userId, email: payload.login };
  }
}
