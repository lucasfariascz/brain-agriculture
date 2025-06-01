import { Test, TestingModule } from '@nestjs/testing';
import { DeleteHarvestService } from './delete-harvest.service';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeleteHarvestService', () => {
  let service: DeleteHarvestService;
  let repository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteHarvestService,
        {
          provide: HarvestRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteHarvestService>(DeleteHarvestService);
    repository = module.get(HarvestRepository);
  });

  it('should delete harvest successfully', async () => {
    const mockHarvest = {
      id: '123',
      year: 2023,
      text: 'Safra 2023',
    };

    repository.findById.mockResolvedValue(mockHarvest as any);
    repository.delete.mockResolvedValue(undefined);

    await service.execute('123');

    expect(repository.findById).toBeDefined();
    expect(repository.delete).toBeDefined();
  });

  it('should fail when harvest not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Safra não encontrada'),
    );
  });
});
