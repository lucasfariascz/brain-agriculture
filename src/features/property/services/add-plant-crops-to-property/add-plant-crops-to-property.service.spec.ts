import { Test, TestingModule } from '@nestjs/testing';
import { AddPlantCropsToPropertyService } from './add-plant-crops-to-property.service';
import { PropertyRepository } from '../../repositories/property.repository';
import { PlantCropRepository } from '../../../plat-crop/repositories/plant-crop.repository';
import { HarvestRepository } from '../../../harvest/repositories/harvest.repository';
import { NotFoundException } from '@nestjs/common';
import { AddPlantCropsToPropertyDto } from '../../dtos/add-plant-crops-to-property.dto';

describe('AddPlantCropsToPropertyService', () => {
  let service: AddPlantCropsToPropertyService;
  let propertyRepository: jest.Mocked<PropertyRepository>;
  let plantCropRepository: jest.Mocked<PlantCropRepository>;
  let harvestRepository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockPropertyRepository = {
      findById: jest.fn(),
    };

    const mockPlantCropRepository = {
      create: jest.fn(),
    };

    const mockHarvestRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddPlantCropsToPropertyService,
        {
          provide: PropertyRepository,
          useValue: mockPropertyRepository,
        },
        {
          provide: PlantCropRepository,
          useValue: mockPlantCropRepository,
        },
        {
          provide: HarvestRepository,
          useValue: mockHarvestRepository,
        },
      ],
    }).compile();

    service = module.get<AddPlantCropsToPropertyService>(
      AddPlantCropsToPropertyService,
    );
    propertyRepository = module.get(PropertyRepository);
    plantCropRepository = module.get(PlantCropRepository);
    harvestRepository = module.get(HarvestRepository);
  });

  it('should add plant crops successfully', async () => {
    const addDto: AddPlantCropsToPropertyDto = {
      plantCrops: [
        {
          name: 'Soja',
          harvestId: '456',
        },
      ],
    };

    const mockProperty = { id: '123', farmName: 'Fazenda São José' };
    const mockHarvest = { id: '456', year: 2023 };

    propertyRepository.findById.mockResolvedValue(mockProperty as any);
    harvestRepository.findById.mockResolvedValue(mockHarvest as any);
    plantCropRepository.create.mockResolvedValue(undefined);

    await service.execute('123', addDto);

    expect(propertyRepository.findById).toBeDefined();
    expect(harvestRepository.findById).toBeDefined();
    expect(plantCropRepository.create).toBeDefined();
  });

  it('should fail when property not found', async () => {
    const addDto: AddPlantCropsToPropertyDto = {
      plantCrops: [],
    };

    propertyRepository.findById.mockResolvedValue(null);

    await expect(service.execute('123', addDto)).rejects.toEqual(
      new NotFoundException('Propriedade com ID 123 não encontrada'),
    );
  });
});
