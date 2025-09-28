// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint básico para probar el servidor
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  // Healthcheck de base de datos (cuenta usuarios)
  @Get('health/db')
  dbHealth() {
    return this.appService.dbHealth();
  }

  // Healthcheck de Redis (ping + latencia)
  @Get('health/redis')
  redisHealth() {
    return this.appService.redisHealth();
  }

  // Health combinado (DB + Redis)
  @Get('health/all')
  allHealth() {
    return this.appService.allHealth();
  }
}
