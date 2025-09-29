// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS (ajusta orígenes según tu front)
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no declaradas en DTO
      forbidNonWhitelisted: true, // error si mandan props extra
      transform: true, // transforma tipos (string->number/bool)
      transformOptions: { enableImplicitConversion: true }, // class-transformer
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Ventas & Inventario API')
    .setDescription('Endpoints de Auth, Users, Products, etc.')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Arrancar servidor
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(PORT);
  console.log(`🚀 API lista en http://localhost:${PORT}/api  | Swagger: /docs`);
}

bootstrap();
