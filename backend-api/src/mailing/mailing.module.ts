import { Module } from '@nestjs/common';
import { MailService } from './mailing.service';
import { MailController } from './mailing.controller';

@Module({
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
