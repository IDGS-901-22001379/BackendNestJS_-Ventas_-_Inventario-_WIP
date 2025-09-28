import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // se conecta a PostgreSQL al iniciar Nest
  }

  async onModuleDestroy() {
    await this.$disconnect(); // se desconecta al apagar Nest
  }
}
