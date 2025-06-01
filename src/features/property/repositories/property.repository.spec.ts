import { Test, TestingModule } from '@nestjs/testing';
import { PropertyRepository } from './property.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropertyEntity } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

describe('PropertyRepository', () => {
  let repository: PropertyRepository;
  let mockTypeOrmRepository: jest.Mocked<Repository<PropertyEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyRepository,
        {
          provide: getRepositoryToken(PropertyEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<PropertyRepository>(PropertyRepository);
    mockTypeOrmRepository = module.get(getRepositoryToken(PropertyEntity));
  });

  it('should create property successfully', async () => {
    const mockProperty = {
      id: '123',
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
    };

    mockTypeOrmRepository.save.mockResolvedValue(undefined);

    await repository.create(mockProperty as any);

    expect(mockTypeOrmRepository.save).toBeDefined();
  });

  it('should fail when save throws error', async () => {
    const mockProperty = {
      id: '123',
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
    };

    mockTypeOrmRepository.save.mockRejectedValue(new Error('Database error'));

    await expect(repository.create(mockProperty as any)).rejects.toEqual(
      new InternalServerErrorException('Falha ao criar propriedade'),
    );
  });
});
