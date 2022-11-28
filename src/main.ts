import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  process.addListener('SIGINT', () => {
    console.log('this is dummy sigint handler');
  });
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
