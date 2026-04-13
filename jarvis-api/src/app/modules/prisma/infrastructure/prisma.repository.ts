import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../prisma/client/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.API_DATABASE_URL,
      }),
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
