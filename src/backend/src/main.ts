import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { StandardSchemaValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new StandardSchemaValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 5000);
}
await bootstrap();
