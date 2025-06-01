import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerRepository } from './rural-producer.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RuralProducerEntity } from '../entities/rural-producer.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

describe('RuralProducerRepository', () => {
  let repository: RuralProducerRepository;
  let mockTypeOrmRepository: jest.Mocked<Repository<RuralProducerEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuralProducerRepository,
        {
          provide: getRepositoryToken(RuralProducerEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<RuralProducerRepository>(RuralProducerRepository);
    mockTypeOrmRepository = module.get(getRepositoryToken(RuralProducerEntity));
  });

  it('should create rural producer successfully', async () => {
    const mockProducer = {
      id: '123',
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
    };

    mockTypeOrmRepository.save.mockResolvedValue(undefined);

    await repository.create(mockProducer as any);

    expect(mockTypeOrmRepository.save).toBeDefined();
  });

  it('should fail when save throws error', async () => {
    const mockProducer = {
      id: '123',
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
    };

    mockTypeOrmRepository.save.mockRejectedValue(new Error('Database error'));

    await expect(repository.create(mockProducer as any)).rejects.toEqual(
      new InternalServerErrorException('Falha ao criar produtor rural'),
    );
  });
});
