import { Test, TestingModule } from '@nestjs/testing';
import { DragonService, FightingDragon } from './dragon.service';

describe('DragonService', () => {
  let service: DragonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragonService],
    }).compile();

    service = module.get<DragonService>(DragonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all dragons', () => {
      const dragons = service.getAll();
      expect(dragons).toBeDefined();
      expect(dragons.length).toBe(4); // We have 4 dragons in the array
    });

    it('should return dragons with correct structure', () => {
      const dragons = service.getAll();
      expect(dragons[0]).toHaveProperty('id');
      expect(dragons[0]).toHaveProperty('name');
      expect(dragons[0]).toHaveProperty('strength');
      expect(dragons[0]).toHaveProperty('startHealth');
      expect(dragons[0]).toHaveProperty('currentHealth');
    });
  });

  describe('fight', () => {
    it('should reduce the health of both dragons after a fight', () => {
      const dragonsBeforeFight = service.getAll();
      const dragon1 = dragonsBeforeFight[0] as FightingDragon;
      const dragon2 = dragonsBeforeFight[1] as FightingDragon;

      const dragon1HealthBeforeFight = dragon1.currentHealth;
      const dragon2HealthBeforeFight = dragon2.currentHealth;

      const [updatedDragon1, updatedDragon2] = service.fight([
        { id: dragon1.id },
        { id: dragon2.id },
      ]);

      expect(updatedDragon1.currentHealth).toBeLessThan(
        dragon1HealthBeforeFight,
      );
      expect(updatedDragon2.currentHealth).toBeLessThan(
        dragon2HealthBeforeFight,
      );
    });

    it('should throw an error if one of the dragons is not found', () => {
      expect(() => service.fight([{ id: 999 }, { id: 1 }])).toThrowError(
        'Oops! One of the dragons is not found',
      );
    });
  });
});
