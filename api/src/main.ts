// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están en DTO
      forbidNonWhitelisted: true, // lanza error si mandan propiedades extra
      transform: true, // convierte tipos automáticamente
    }),
  );

  // ✅ Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Ventas & Inventario API')
    .setDescription('Endpoints de Auth, Users, Health. Proximamente Products/Inventory.')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // ✅ Arrancar servidor
  await app.listen(3000);
}
bootstrap();
