import { Global, Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { Mailer } from './domain/services/mailer.service';
import { NestjsMailerService } from './infrastructure/services/nestjs-mailer.service';

@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: process.env.API_SMTP_HOST!,
        port: parseInt(process.env.API_SMTP_PORT!),
        secure: false,
        auth: false,
      },
      defaults: {
        from: process.env.API_SMTP_FROM!,
      },
    }),
  ],
  providers: [
    {
      provide: Mailer,
      useClass: NestjsMailerService,
    },
  ],
  exports: [Mailer],
})
export class MailModule {}
