import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOTPEmail(email: string, context: any) {
    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Krystal OTP Verification',
        template: 'email-otp-template',
        context,
      })
      .then(() => {})
      .catch(() => {});
  }
}
