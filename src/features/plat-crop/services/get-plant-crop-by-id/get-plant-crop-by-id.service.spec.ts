import { Test, TestingModule } from '@nestjs/testing';
import { GetPlantCropByIdService } from './get-plant-crop-by-id.service';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetPlantCropByIdService', () => {
  let service: GetPlantCropByIdService;
  let repository: jest.Mocked<PlantCropRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPlantCropByIdService,
        {
          provide: PlantCropRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetPlantCropByIdService>(GetPlantCropByIdService);
    repository = module.get(PlantCropRepository);
  });

  it('should get plant crop successfully', async () => {
    const mockPlantCrop = {
      id: '123',
      name: 'Soja',
      property: { id: '456', farmName: 'Fazenda São José' },
      harvest: { id: '789', year: 2023 },
    };

    repository.findById.mockResolvedValue(mockPlantCrop as any);

    const result = await service.execute('123');

    expect(result).toBeDefined();
    expect(repository.findById).toBeDefined();
  });

  it('should fail when plant crop not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Cultura plantada não encontrada'),
    );
  });
});
