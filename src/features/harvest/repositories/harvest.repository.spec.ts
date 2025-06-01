import { Test, TestingModule } from '@nestjs/testing';
import { HarvestRepository } from './harvest.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HarvestEntity } from '../entities/harvest.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

describe('HarvestRepository', () => {
  let repository: HarvestRepository;
  let mockTypeOrmRepository: jest.Mocked<Repository<HarvestEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestRepository,
        {
          provide: getRepositoryToken(HarvestEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<HarvestRepository>(HarvestRepository);
    mockTypeOrmRepository = module.get(getRepositoryToken(HarvestEntity));
  });

  it('should create harvest successfully', async () => {
    const mockHarvest = {
      id: '123',
      year: 2023,
      text: 'Safra 2023',
    };

    mockTypeOrmRepository.save.mockResolvedValue(undefined);

    await repository.create(mockHarvest as any);

    expect(mockTypeOrmRepository.save).toBeDefined();
  });

  it('should fail when save throws error', async () => {
    const mockHarvest = {
      id: '123',
      year: 2023,
      text: 'Safra 2023',
    };

    mockTypeOrmRepository.save.mockRejectedValue(new Error('Database error'));

    await expect(repository.create(mockHarvest as any)).rejects.toEqual(
      new InternalServerErrorException('Falha ao criar safra'),
    );
  });
});
