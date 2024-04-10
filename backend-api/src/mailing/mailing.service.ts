import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async sendMail(body: {
    email: string;
    text: string;
    name: string;
    number: string;
    surname: string;
  }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Anfrage auf unserer Website von ${body.name} ${
          body.surname || ''
        }`,
        text: `${body.name} ${body.surname || ''}  möchte mit Ihnen Kontakt aufnehmen. 
        Hier ist die Nachricht: : ${body.text}
    
        Kontaktinformationen:
        E-Mail: ${body.email}
        ${body.number ? 'Telefonnummer: ' + body.number : ''}
       `,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
