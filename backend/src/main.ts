import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // All routes will be prefixed with /api
  app.enableCors(); // Enable CORS

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
