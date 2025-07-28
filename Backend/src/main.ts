import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryExceptionFilter } from './sentry-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new SentryExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://my-portfolio-henna-one-36.vercel.app',
    ],
    credentials: true,
  });
  app.use(
    '/contact',
    rateLimit({
      windowMs: 60 * 1000, // 1 Min
      max: 5, // max. 5 Requests
    }),
  );
  app.use(
    '/auth',
    rateLimit({
      windowMs: 60 * 1000, //
      max: 10,
    }),
  );
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
