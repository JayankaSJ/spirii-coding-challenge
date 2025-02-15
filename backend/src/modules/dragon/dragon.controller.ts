import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { DragonService } from './dragon.service';
import { Dragon } from 'src/common/types/Dragon';

interface DragonFightRequest {
  dragons: { id: number }[];
}

@Controller('dragon')
export class DragonController {
  constructor(private readonly dragonService: DragonService) {}

  @Get()
  getAll(): Dragon[] {
    return this.dragonService.getAll();
  }

  @Post('fight')
  fight(@Body() body: DragonFightRequest): Dragon[] {
    // validate the request where dragons should be present
    if (!body.dragons || body.dragons.length < 1) {
      throw new BadRequestException(
        'Oops! You need to select dragons to fight',
      );
    }
    // validate the request where dragon count should be 2
    if (body.dragons.length !== 2) {
      throw new BadRequestException(
        'Oops! Too many dragons, you can only fight with 2 dragons',
      );
    }
    return this.dragonService.fight(body.dragons);
  }
}
