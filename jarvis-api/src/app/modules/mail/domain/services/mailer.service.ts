export type SendMailOptions = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
};

export abstract class Mailer {
  abstract sendMail(options: SendMailOptions): Promise<void>;
}
