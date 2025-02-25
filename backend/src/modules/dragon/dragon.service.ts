import { Injectable } from '@nestjs/common';
import { Dragon } from 'src/common/types/Dragon';

export type FightingDragon = Dragon & {
  currentHealth: number;
};

@Injectable()
export class DragonService {
  private dragons: FightingDragon[] = [
    {
      id: 1,
      name: 'Fire Dragon',
      strength: 50,
      startHealth: 100,
      currentHealth: 100,
    },
    {
      id: 2,
      name: 'Water Dragon',
      strength: 60,
      startHealth: 100,
      currentHealth: 100,
    },
    {
      id: 3,
      name: 'Earth Dragon',
      strength: 70,
      startHealth: 110,
      currentHealth: 100,
    },
    {
      id: 4,
      name: 'Air Dragon',
      strength: 80,
      startHealth: 100,
      currentHealth: 100,
    },
  ];

  getAll(): Dragon[] {
    return this.dragons;
  }

  fight(dragons: { id: number }[]): FightingDragon[] {
    const [dragon1, dragon2] = dragons;
    const dragon1Obj = this.dragons.find((d) => d.id === dragon1.id);
    const dragon2Obj = this.dragons.find((d) => d.id === dragon2.id);

    if (!dragon1Obj || !dragon2Obj) {
      throw new Error('Oops! One of the dragons is not found');
    }

    // randomFactor should be in range 1 to 20
    const randomFactor = Math.floor(Math.random() * 20) + 1;

    const damage1 = Math.round(randomFactor * (dragon2Obj.strength / 100));
    const damage2 = Math.round(randomFactor * (dragon1Obj.strength / 100));

    dragon1Obj.currentHealth -= damage1;
    dragon2Obj.currentHealth -= damage2;

    return [dragon1Obj, dragon2Obj];
  }
}
