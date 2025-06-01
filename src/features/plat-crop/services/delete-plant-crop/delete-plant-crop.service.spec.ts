import { Test, TestingModule } from '@nestjs/testing';
import { DeletePlantCropService } from './delete-plant-crop.service';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeletePlantCropService', () => {
  let service: DeletePlantCropService;
  let repository: jest.Mocked<PlantCropRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePlantCropService,
        {
          provide: PlantCropRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeletePlantCropService>(DeletePlantCropService);
    repository = module.get(PlantCropRepository);
  });

  it('should delete plant crop successfully', async () => {
    const mockPlantCrop = {
      id: '123',
      name: 'Soja',
      property: { id: '456', farmName: 'Fazenda São José' },
      harvest: { id: '789', year: 2023 },
    };

    repository.findById.mockResolvedValue(mockPlantCrop as any);
    repository.delete.mockResolvedValue(undefined);

    await service.execute('123');

    expect(repository.findById).toBeDefined();
    expect(repository.delete).toBeDefined();
  });

  it('should fail when plant crop not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Cultura plantada não encontrada'),
    );
  });
});
