import { Test, TestingModule } from '@nestjs/testing';
import { GetPropertyWithPlantCropByIdService } from './get-property-with-plant-crop-by-id.service';
import { PropertyRepository } from '../../repositories/property.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetPropertyWithPlantCropByIdService', () => {
  let service: GetPropertyWithPlantCropByIdService;
  let repository: jest.Mocked<PropertyRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPropertyWithPlantCropByIdService,
        {
          provide: PropertyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetPropertyWithPlantCropByIdService>(
      GetPropertyWithPlantCropByIdService,
    );
    repository = module.get(PropertyRepository);
  });

  it('should get property with plant crop successfully', async () => {
    const mockProperty = {
      id: '123',
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
      plantCrops: [],
    };

    repository.findById.mockResolvedValue(mockProperty as any);

    const result = await service.execute('123');

    expect(result).toBeDefined();
    expect(repository.findById).toBeDefined();
  });

  it('should fail when property not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Propriedade não encontrada'),
    );
  });
});
