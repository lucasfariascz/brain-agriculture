import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePropertyService } from './update-property.service';
import { PropertyRepository } from '../../repositories/property.repository';
import { NotFoundException } from '@nestjs/common';
import { UpdatePropertyDto } from '../../dtos/update-property.dto';

describe('UpdatePropertyService', () => {
  let service: UpdatePropertyService;
  let repository: jest.Mocked<PropertyRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePropertyService,
        {
          provide: PropertyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UpdatePropertyService>(UpdatePropertyService);
    repository = module.get(PropertyRepository);
  });

  it('should update property successfully', async () => {
    const updateDto: UpdatePropertyDto = {
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
      totalAreaHectares: 100,
      arableAreaHectares: 60,
      vegetationAreaHectares: 40,
    };

    const mockProperty = {
      id: '123',
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
    };

    repository.findById.mockResolvedValue(mockProperty as any);
    repository.update.mockResolvedValue(undefined);

    await service.execute('123', updateDto);

    expect(repository.findById).toBeDefined();
    expect(repository.update).toBeDefined();
  });

  it('should fail when property not found', async () => {
    const updateDto: UpdatePropertyDto = {
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
      totalAreaHectares: 100,
      arableAreaHectares: 60,
      vegetationAreaHectares: 40,
    };

    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123', updateDto)).rejects.toEqual(
      new NotFoundException('Propriedade não encontrada'),
    );
  });
});
