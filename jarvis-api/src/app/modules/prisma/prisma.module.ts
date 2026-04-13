import { Global, Module } from '@nestjs/common';
import { PrismaRepository } from './infrastructure/prisma.repository';

@Global()
@Module({
  providers: [PrismaRepository],
  exports: [PrismaRepository],
})
export class PrismaModule {}
