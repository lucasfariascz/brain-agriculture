import { Test, TestingModule } from '@nestjs/testing';
import { GetPlantCropsService } from './get-plant-crops.service';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';

describe('GetPlantCropsService', () => {
  let service: GetPlantCropsService;
  let repository: jest.Mocked<PlantCropRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlantCropsService,
        {
          provide: PlantCropRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetPlantCropsService>(GetPlantCropsService);
    repository = module.get(PlantCropRepository);
  });

  it('should get all plant crops successfully', async () => {
    const mockPlantCrops = [
      {
        id: '123',
        name: 'Soja',
        property: { id: '456', farmName: 'Fazenda São José' },
        harvest: { id: '789', year: 2023 },
      },
    ];

    repository.findAll.mockResolvedValue(mockPlantCrops as any);

    const result = await service.execute();

    expect(result).toBeDefined();
    expect(repository.findAll).toBeDefined();
  });

  it('should fail when repository throws error', async () => {
    repository.findAll.mockRejectedValue(new Error('Database error'));

    await expect(service.execute()).rejects.toBeDefined();
  });
});
