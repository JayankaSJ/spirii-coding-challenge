import { Module } from '@nestjs/common';
import { DragonController } from './modules/dragon/dragon.controller';
import { DragonService } from './modules/dragon/dragon.service';

@Module({
  imports: [],
  controllers: [DragonController],
  providers: [DragonService],
})
export class AppModule {}
