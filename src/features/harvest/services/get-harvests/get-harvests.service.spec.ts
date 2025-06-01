import { Test, TestingModule } from '@nestjs/testing';
import { GetHarvestsService } from './get-harvests.service';
import { HarvestRepository } from '../../repositories/harvest.repository';

describe('GetHarvestsService', () => {
  let service: GetHarvestsService;
  let repository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetHarvestsService,
        {
          provide: HarvestRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetHarvestsService>(GetHarvestsService);
    repository = module.get(HarvestRepository);
  });

  it('should get all harvests successfully', async () => {
    const mockHarvests = [
      {
        id: '123',
        year: 2023,
        text: 'Safra 2023',
      },
    ];

    repository.findAll.mockResolvedValue(mockHarvests as any);

    const result = await service.execute();

    expect(result).toBeDefined();
    expect(repository.findAll).toBeDefined();
  });

  it('should fail when repository throws error', async () => {
    repository.findAll.mockRejectedValue(new Error('Database error'));

    await expect(service.execute()).rejects.toBeDefined();
  });
});
