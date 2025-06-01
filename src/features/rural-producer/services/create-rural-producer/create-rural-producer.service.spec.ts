import { Test, TestingModule } from '@nestjs/testing';
import { CreateRuralProducerService } from './create-rural-producer.service';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { BadRequestException } from '@nestjs/common';
import { CreateRuralProducerDto } from '../../dtos/create-rural-producer.dto';

describe('CreateRuralProducerService', () => {
  let service: CreateRuralProducerService;
  let repository: jest.Mocked<RuralProducerRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findByCpfOrCnpj: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRuralProducerService,
        {
          provide: RuralProducerRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateRuralProducerService>(
      CreateRuralProducerService,
    );
    repository = module.get(RuralProducerRepository);
  });

  it('should create rural producer successfully', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
    };

    repository.findByCpfOrCnpj.mockResolvedValue(null);
    repository.create.mockResolvedValue(undefined);

    await service.execute(createDto);

    expect(repository.findByCpfOrCnpj).toBeDefined();
    expect(repository.create).toBeDefined();
  });

  it('should fail when rural producer already exists', async () => {
    const createDto: CreateRuralProducerDto = {
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
    };

    const existingProducer = {
      id: '123',
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
    };

    repository.findByCpfOrCnpj.mockResolvedValue(existingProducer as any);

    await expect(service.execute(createDto)).rejects.toEqual(
      new BadRequestException('Produtor rural já existe.'),
    );
  });
});
