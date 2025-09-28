// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  getHello() {
    return { message: 'Hello World from NestJS + Prisma 🚀' };
  }

  async dbHealth() {
    const users = await this.prisma.user.count();
    return { ok: true, users };
  }

  async redisHealth() {
    const r = await this.redis.ping();
    return { ok: r.ok, latencyMs: r.latencyMs };
  }

  async allHealth() {
    const [db, redis] = await Promise.all([this.dbHealth(), this.redisHealth()]);
    return { db, redis };
  }
}
