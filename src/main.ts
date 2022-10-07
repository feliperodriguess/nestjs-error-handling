import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { DatabaseInterceptor } from './interceptors/database.interceptor';
import { ConflictInterceptor } from './interceptors/conflict.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());

  await app.listen(3000);
}

bootstrap();
