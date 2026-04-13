import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from '../../../../shared/application/usecases/base.usecase';
import { SendAdminEmailCommand, SendAdminEmailResult } from './send-admin-email.types';

@Injectable()
export class SendAdminEmailUseCase implements UseCase<SendAdminEmailCommand, SendAdminEmailResult> {
  private readonly logger = new Logger(SendAdminEmailUseCase.name);
  private readonly sysadminEmail = 'sysadmin@truck-system.com';

  async execute(command: SendAdminEmailCommand): Promise<SendAdminEmailResult> {
    this.logger.log(
      `[EMAIL] To: ${this.sysadminEmail}, Subject: ${command.subject}, Body: ${command.body}`,
    );

    return { success: true };
  }
}
