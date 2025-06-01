import { Test, TestingModule } from '@nestjs/testing';
import { UpdateHarvestService } from './update-harvest.service';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdateHarvestDto } from '../../dtos/update-harvest.dto';

describe('UpdateHarvestService', () => {
  let service: UpdateHarvestService;
  let repository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateHarvestService,
        {
          provide: HarvestRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateHarvestService>(UpdateHarvestService);
    repository = module.get(HarvestRepository);
  });

  it('should update harvest successfully', async () => {
    const updateDto: UpdateHarvestDto = {
      year: 2024,
    };

    const mockHarvest = {
      id: '123',
      year: 2023,
      text: 'Safra 2023',
    };

    repository.findById.mockResolvedValue(mockHarvest as any);
    repository.update.mockResolvedValue(undefined);

    await service.execute('123', updateDto);

    expect(repository.findById).toBeDefined();
    expect(repository.update).toBeDefined();
  });

  it('should fail when harvest not found', async () => {
    const updateDto: UpdateHarvestDto = {
      year: 2024,
    };

    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123', updateDto)).rejects.toEqual(
      new NotFoundException('Safra não encontrada'),
    );
  });
});
