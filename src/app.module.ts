import {
  BeforeApplicationShutdown,
  Logger,
  Module,
  OnApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule
  implements OnApplicationShutdown, BeforeApplicationShutdown, OnModuleDestroy
{
  private readonly logger = new Logger(AppModule.name);

  onModuleDestroy() {
    this.logger.log('onModuleDestroy called!');
  }

  beforeApplicationShutdown(signal?: string) {
    this.logger.log(`beforeApplicationShutdown called! ${signal}`);
  }

  onApplicationShutdown(signal?: string) {
    this.logger.log(`onApplicationShutdown called! ${signal}`);
  }
}
