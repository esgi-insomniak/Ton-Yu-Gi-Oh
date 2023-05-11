import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from '../services/mailer.service';
import { DefaultResponse } from '../interfaces/common/common.response.interface';
import { MailerMessage } from '../interfaces/mail/mailer.interface';
import { ConfigService } from '../services/config/config.service';

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) { }

  @MessagePattern('send_confirmation_email')
  public async sendConfirmationEmail(params: {
    email: string;
    username: string;
    token: string;
  }): Promise<DefaultResponse> {
    let result: DefaultResponse = {
      status: HttpStatus.FAILED_DEPENDENCY,
      message: 'Confirmation email failed to send.',
    };

    const message: MailerMessage = {
      to: params.email,
      subject: '[TonYuGiOh] Thank you for registering!',
      htmlBody: `<p>Thank you ${params.username
        } for registering with TonYuGiOh!</p>
      <p>Please click the link below to confirm your email address.</p>
      <p><a href="${this.configService.get(
          'websiteUrl',
        )}/account-confirmation/${params.token}">Confirm Email</a></p>`,
    };

    const sent = await this.mailerService.sendEmail(message);

    if (sent) {
      result = {
        status: HttpStatus.OK,
        message: 'Confirmation email sent.',
      };
    }

    return result;
  }

  @MessagePattern('send_password_reset_email')
  public async sendPasswordResetEmail(params: {
    email: string;
    username: string;
    token: string;
  }): Promise<DefaultResponse> {
    let result: DefaultResponse = {
      status: HttpStatus.FAILED_DEPENDENCY,
      message: 'Password reset email failed to send.',
    };

    const message: MailerMessage = {
      to: params.email,
      subject: '[TonYuGiOh] Password Reset',
      htmlBody: `<p>Hi ${params.username
        },</p><p>Please click the link below to reset your password.</p>
      <p><a href="${this.configService.get(
          'websiteUrl',
        )}/password-reset/${params.token}">Reset Password</a></p>`,
    };

    const sent = await this.mailerService.sendEmail(message);

    if (sent) {
      result = {
        status: HttpStatus.OK,
        message: 'Password reset email sent.',
      };
    }

    return result;
  }
}
