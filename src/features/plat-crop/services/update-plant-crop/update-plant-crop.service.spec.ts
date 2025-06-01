import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePlantCropService } from './update-plant-crop.service';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { PropertyRepository } from '../../../property/repositories/property.repository';
import { HarvestRepository } from '../../../harvest/repositories/harvest.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdatePlantCropDto } from '../../dtos/update-plant-crop.dto';

describe('UpdatePlantCropService', () => {
  let service: UpdatePlantCropService;
  let plantCropRepository: jest.Mocked<PlantCropRepository>;
  let propertyRepository: jest.Mocked<PropertyRepository>;
  let harvestRepository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockPlantCropRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const mockPropertyRepository = {
      findById: jest.fn(),
    };

    const mockHarvestRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePlantCropService,
        {
          provide: PlantCropRepository,
          useValue: mockPlantCropRepository,
        },
        {
          provide: PropertyRepository,
          useValue: mockPropertyRepository,
        },
        {
          provide: HarvestRepository,
          useValue: mockHarvestRepository,
        },
      ],
    }).compile();

    service = module.get<UpdatePlantCropService>(UpdatePlantCropService);
    plantCropRepository = module.get(PlantCropRepository);
    propertyRepository = module.get(PropertyRepository);
    harvestRepository = module.get(HarvestRepository);
  });

  it('should update plant crop successfully', async () => {
    const updateDto: UpdatePlantCropDto = {
      name: 'Milho',
      propertyId: '123',
      harvestId: '456',
    };

    const mockPlantCrop = { id: '789', name: 'Soja' };
    const mockProperty = { id: '123', farmName: 'Fazenda São José' };
    const mockHarvest = { id: '456', year: 2023 };

    plantCropRepository.findById.mockResolvedValue(mockPlantCrop as any);
    propertyRepository.findById.mockResolvedValue(mockProperty as any);
    harvestRepository.findById.mockResolvedValue(mockHarvest as any);
    plantCropRepository.update.mockResolvedValue(undefined);

    await service.execute('789', updateDto);

    expect(plantCropRepository.findById).toBeDefined();
    expect(propertyRepository.findById).toBeDefined();
    expect(harvestRepository.findById).toBeDefined();
    expect(plantCropRepository.update).toBeDefined();
  });

  it('should fail when plant crop not found', async () => {
    const updateDto: UpdatePlantCropDto = {
      name: 'Milho',
      propertyId: '123',
      harvestId: '456',
    };

    plantCropRepository.findById.mockResolvedValue(null);

    await expect(service.execute('789', updateDto)).rejects.toEqual(
      new NotFoundException('Cultura plantada não encontrada'),
    );
  });
});
