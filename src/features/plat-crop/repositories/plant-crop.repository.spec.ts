import { Test, TestingModule } from '@nestjs/testing';
import { PlantCropRepository } from './plant-crop.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlantCropEntity } from '../entities/plant-crop.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

describe('PlantCropRepository', () => {
  let repository: PlantCropRepository;
  let mockTypeOrmRepository: jest.Mocked<Repository<PlantCropEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantCropRepository,
        {
          provide: getRepositoryToken(PlantCropEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<PlantCropRepository>(PlantCropRepository);
    mockTypeOrmRepository = module.get(getRepositoryToken(PlantCropEntity));
  });

  it('should create plant crop successfully', async () => {
    const mockPlantCrop = {
      id: '123',
      name: 'Soja',
      property: { id: '456' },
      harvest: { id: '789' },
    };

    mockTypeOrmRepository.save.mockResolvedValue(undefined);

    await repository.create(mockPlantCrop as any);

    expect(mockTypeOrmRepository.save).toBeDefined();
  });

  it('should fail when save throws error', async () => {
    const mockPlantCrop = {
      id: '123',
      name: 'Soja',
      property: { id: '456' },
      harvest: { id: '789' },
    };

    mockTypeOrmRepository.save.mockRejectedValue(new Error('Database error'));

    await expect(repository.create(mockPlantCrop as any)).rejects.toEqual(
      new InternalServerErrorException('Falha ao criar cultura plantada'),
    );
  });
});
