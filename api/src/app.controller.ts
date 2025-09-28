import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello() {
    return { message: 'Hello World from NestJS + Prisma 🚀' };
  }

  @Get('health/db')
  async dbHealth() {
    const users = await this.prisma.user.count();
    return { ok: true, users };
  }
}
