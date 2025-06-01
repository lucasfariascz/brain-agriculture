import { Test, TestingModule } from '@nestjs/testing';
import { CreateHarvestService } from './create-harvest.service';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { CreateHarvestDto } from '../../dtos/create-harvest.dto';

describe('CreateHarvestService', () => {
  let service: CreateHarvestService;
  let repository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHarvestService,
        {
          provide: HarvestRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateHarvestService>(CreateHarvestService);
    repository = module.get(HarvestRepository);
  });

  it('should create harvest successfully', async () => {
    const createDto: CreateHarvestDto = {
      year: 2023,
    };

    repository.create.mockResolvedValue(undefined);

    await service.execute(createDto);

    expect(repository.create).toBeDefined();
  });

  it('should fail when repository throws error', async () => {
    const createDto: CreateHarvestDto = {
      year: 2023,
    };

    repository.create.mockRejectedValue(new Error('Database error'));

    await expect(service.execute(createDto)).rejects.toBeDefined();
  });
});
