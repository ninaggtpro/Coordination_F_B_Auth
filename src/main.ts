// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  // ── CORS ──────────────────────────────────────────────────────────────────
  const rawOrigins = process.env.CORS_ORIGIN ?? '*';
  const origins =
    rawOrigins === '*' ? '*' : rawOrigins.split(',').map((o) => o.trim());

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: origins !== '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Authentication service for cinema reservation system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3002;
  await app.listen(port);
}
bootstrap();
