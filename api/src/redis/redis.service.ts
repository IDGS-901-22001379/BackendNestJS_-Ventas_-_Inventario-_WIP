import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;

  constructor(private config: ConfigService) {
    this.client = new Redis({
      host: this.config.get<string>('REDIS_HOST') ?? '127.0.0.1',
      port: Number(this.config.get<number>('REDIS_PORT') ?? 6379),
      password: this.config.get<string>('REDIS_PASSWORD') || undefined,
      maxRetriesPerRequest: 1,
      lazyConnect: false,
    });
  }

  async ping() {
    const start = Date.now();
    const res = await this.client.ping();
    const latencyMs = Date.now() - start;
    return { ok: res === 'PONG', res, latencyMs };
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
