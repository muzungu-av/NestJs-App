import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailService } from './mailing.service';
import { winstonLogger } from 'winston.logger';

@Controller('/api/mailing')
export class MailController {
  constructor(private readonly mailService: MailService) {
    winstonLogger.info('MailerControllerRUN');
  }

  @Post('send')
  async sendMail(
    @Body()
    body: {
      email: string;
      text: string;
      name: string;
      number: string;
      surname: string;
    },
  ) {
    try {
      await this.mailService.sendMail(body);
      return 'The letter was sent successfully';
    } catch (error) {
      return `${error}`;
    }
  }
}
