import { Test, TestingModule } from '@nestjs/testing';
import { GetHarvestByIdService } from './get-harvest-by-id.service';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetHarvestByIdService', () => {
  let service: GetHarvestByIdService;
  let repository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetHarvestByIdService,
        {
          provide: HarvestRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetHarvestByIdService>(GetHarvestByIdService);
    repository = module.get(HarvestRepository);
  });

  it('should get harvest successfully', async () => {
    const mockHarvest = {
      id: '123',
      year: 2023,
      text: 'Safra 2023',
    };

    repository.findById.mockResolvedValue(mockHarvest as any);

    const result = await service.execute('123');

    expect(result).toBeDefined();
    expect(repository.findById).toBeDefined();
  });

  it('should fail when harvest not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Safra não encontrada'),
    );
  });
});
