import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prisma registers SIGINT which does `process.exit` if there's no other process.listeners('SIGINT') when the handler actually called.
  // It seems that when Prisma's SIGINT listener is invoked Prisma's listener is already detached from process.listeners('SIGINT'),
  // so Prisma's listener does `process.exit` (even if `app.enableShutdownHooks` is called)
  // By explicitly define another listener here, Prisma's SIGINT listener is not the only listener when it's executed so it does not make this process exit.
  const myListener = () => {
    for (const listener of process.listeners('SIGINT')) {
      console.log('onSIGINT', listener);
    }
    console.log('this is dummy SIGINT handler');
  };
  process.on('SIGINT', myListener);

  app.enableShutdownHooks();

  for (const listener of process.listeners('SIGINT')) {
    console.log('before', listener);
  }

  await app.listen(3000);
}
bootstrap();
