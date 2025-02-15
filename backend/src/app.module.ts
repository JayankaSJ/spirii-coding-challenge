import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DragonController } from './modules/dragon/dragon.controller';
import { DragonService } from './modules/dragon/dragon.service';

@Module({
  imports: [],
  controllers: [AppController, DragonController],
  providers: [AppService, DragonService],
})
export class AppModule {}
