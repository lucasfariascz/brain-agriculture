import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlantCropService } from './create-plant-crop.service';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { PropertyRepository } from '../../../property/repositories/property.repository';
import { HarvestRepository } from '../../../harvest/repositories/harvest.repository';
import { NotFoundException } from '@nestjs/common';
import { CreatePlantCropDto } from '../../dtos/create-plant-crop.dto';

describe('CreatePlantCropService', () => {
  let service: CreatePlantCropService;
  let plantCropRepository: jest.Mocked<PlantCropRepository>;
  let propertyRepository: jest.Mocked<PropertyRepository>;
  let harvestRepository: jest.Mocked<HarvestRepository>;

  beforeEach(async () => {
    const mockPlantCropRepository = {
      create: jest.fn(),
    };

    const mockPropertyRepository = {
      findById: jest.fn(),
    };

    const mockHarvestRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlantCropService,
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

    service = module.get<CreatePlantCropService>(CreatePlantCropService);
    plantCropRepository = module.get(PlantCropRepository);
    propertyRepository = module.get(PropertyRepository);
    harvestRepository = module.get(HarvestRepository);
  });

  it('should create plant crop successfully', async () => {
    const createDto: CreatePlantCropDto = {
      name: 'Soja',
      propertyId: '123',
      harvestId: '456',
    };

    const mockProperty = { id: '123', farmName: 'Fazenda São José' };
    const mockHarvest = { id: '456', year: 2023 };

    propertyRepository.findById.mockResolvedValue(mockProperty as any);
    harvestRepository.findById.mockResolvedValue(mockHarvest as any);
    plantCropRepository.create.mockResolvedValue(undefined);

    await service.execute(createDto);

    expect(propertyRepository.findById).toBeDefined();
    expect(harvestRepository.findById).toBeDefined();
    expect(plantCropRepository.create).toBeDefined();
  });

  it('should fail when property not found', async () => {
    const createDto: CreatePlantCropDto = {
      name: 'Soja',
      propertyId: '123',
      harvestId: '456',
    };

    propertyRepository.findById.mockResolvedValue(null);

    await expect(service.execute(createDto)).rejects.toEqual(
      new NotFoundException('Propriedade não encontrada'),
    );
  });
});
