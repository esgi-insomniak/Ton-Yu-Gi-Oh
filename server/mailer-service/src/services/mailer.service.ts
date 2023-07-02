import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from './config/config.service';
import * as Transport from 'nodemailer-sendinblue-transport';
import { MailerMessage } from '../interfaces/mail/mailer.interface';
import { SentMessageInfo } from 'nodemailer/lib/smtp-connection';

@Injectable()
export class MailerService {
  private mailer: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    let transport: string | Transport;

    if (process.env.NODE_ENV === 'production') {
      transport = new Transport({
        apiKey: configService.get('mailerApiKey'),
      });
    } else {
      transport = configService.get('mailerDSN');
    }

    this.mailer = nodemailer.createTransport(transport);
  }

  async sendEmail(message: MailerMessage): Promise<boolean> {
    try {
      const info: SentMessageInfo = await this.mailer.sendMail({
        from: this.configService.get('mailerUser'),
        to: message.to,
        subject: message.subject,
        html: message.htmlBody,
      });

      return info.accepted.length > 0;
    } catch (e) {
      throw e;
    }
  }
}
