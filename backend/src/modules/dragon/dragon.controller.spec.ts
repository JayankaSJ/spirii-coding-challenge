import { Test, TestingModule } from '@nestjs/testing';
import { DragonController } from './dragon.controller';
import { DragonService, FightingDragon } from './dragon.service';
import { BadRequestException } from '@nestjs/common';

describe('DragonController', () => {
  let controller: DragonController;
  let service: DragonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DragonController],
      providers: [
        {
          provide: DragonService,
          useValue: {
            getAll: jest.fn(),
            fight: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DragonController>(DragonController);
    service = module.get<DragonService>(DragonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all dragons', async () => {
      const dragons: FightingDragon[] = [
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
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(dragons as never);
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const result = await controller.getAll();
      expect(result).toBe(dragons);
    });
  });

  describe('fight', () => {
    it('should return dragons after a fight', async () => {
      const dragonFightRequest = { dragons: [{ id: 1 }, { id: 2 }] };
      const updatedDragons = [
        {
          id: 1,
          name: 'Fire Dragon',
          strength: 50,
          startHealth: 100,
          currentHealth: 80,
        },
        {
          id: 2,
          name: 'Water Dragon',
          strength: 60,
          startHealth: 100,
          currentHealth: 85,
        },
      ];
      jest.spyOn(service, 'fight').mockResolvedValue(updatedDragons as never);
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const result = await controller.fight(dragonFightRequest);
      expect(result).toBe(updatedDragons);
    });

    it('should throw BadRequestException if no dragons are provided', async () => {
      const dragonFightRequest = { dragons: [] };
      try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await controller.fight(dragonFightRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(error.response.message).toBe(
          'Oops! You need to select dragons to fight',
        );
      }
    });

    it('should throw BadRequestException if more than 2 dragons are provided', async () => {
      const dragonFightRequest = {
        dragons: [{ id: 1 }, { id: 2 }, { id: 3 }],
      };
      try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await controller.fight(dragonFightRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(error.response.message).toBe(
          'Oops! Too many dragons, you can only fight with 2 dragons',
        );
      }
    });
  });
});
