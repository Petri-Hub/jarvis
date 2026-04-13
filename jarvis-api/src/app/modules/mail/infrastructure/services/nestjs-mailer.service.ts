import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mailer, SendMailOptions } from '../../domain/services/mailer.service';

@Injectable()
export class NestjsMailerService implements Mailer {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ to, subject, text, html, cc, bcc }: SendMailOptions): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      html,
      cc,
      bcc,
    });
  }
}
