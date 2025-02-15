import { Injectable } from '@nestjs/common';
import { Dragon } from 'src/common/interfaces/Dragon';

@Injectable()
export class DragonService {
  private dragons: Dragon[] = [
    { name: 'FireDragon', strength: 80, health: 100 },
    { name: 'WaterDragon', strength: 60, health: 90 },
    { name: 'EarthDragon', strength: 70, health: 110 },
  ];
  get(): Dragon[] {
    return this.dragons;
  }
}
