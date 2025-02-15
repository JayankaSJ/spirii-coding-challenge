import { Controller, Get } from '@nestjs/common';
import { DragonService } from './dragon.service';
import { Dragon } from 'src/common/interfaces/Dragon';

@Controller('dragon')
export class DragonController {
  constructor(private readonly dragonService: DragonService) {}

  @Get()
  getHello(): Dragon[] {
    return this.dragonService.get();
  }
}
