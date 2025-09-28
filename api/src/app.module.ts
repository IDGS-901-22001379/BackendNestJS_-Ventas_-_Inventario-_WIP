// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // variables .env accesibles globalmente
    PrismaModule, // conexión a la base de datos (Postgres + Prisma)
    UsersModule, // gestión de usuarios
    AuthModule, // autenticación y JWT
    RedisModule,
    ProductsModule, // conexión a Redis (para health, cache, colas, etc.)
  ],
  controllers: [AppController], // endpoints raíz y health
  providers: [
    AppService, // lógica de app
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // roles como guard global
    },
  ],
})
export class AppModule {}
