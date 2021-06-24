import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({ secret: 'my-secret', resave: false, saveUninitialized: false }),
  );
  app.use(cookieParser('palabra secreta'));
  await app.listen(3000);
}
bootstrap();
