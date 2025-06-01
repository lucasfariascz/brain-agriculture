import { Test, TestingModule } from '@nestjs/testing';
import { CreatePropertyService } from './create-property.service';
import { PropertyRepository } from '../../repositories/property.repository';
import { RuralProducerRepository } from '../../../rural-producer/repositories/rural-producer.repository';
import { NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from '../../dtos/create-property.dto';

describe('CreatePropertyService', () => {
  let service: CreatePropertyService;
  let propertyRepository: jest.Mocked<PropertyRepository>;
  let ruralProducerRepository: jest.Mocked<RuralProducerRepository>;

  beforeEach(async () => {
    const mockPropertyRepository = {
      create: jest.fn(),
    };

    const mockRuralProducerRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyService,
        {
          provide: PropertyRepository,
          useValue: mockPropertyRepository,
        },
        {
          provide: RuralProducerRepository,
          useValue: mockRuralProducerRepository,
        },
      ],
    }).compile();

    service = module.get<CreatePropertyService>(CreatePropertyService);
    propertyRepository = module.get(PropertyRepository);
    ruralProducerRepository = module.get(RuralProducerRepository);
  });

  it('should create property successfully', async () => {
    const createDto: CreatePropertyDto = {
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
      totalAreaHectares: 100,
      arableAreaHectares: 60,
      vegetationAreaHectares: 40,
      ruralProducerId: '123',
    };

    const mockProducer = {
      id: '123',
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
    };

    ruralProducerRepository.findById.mockResolvedValue(mockProducer as any);
    propertyRepository.create.mockResolvedValue(undefined);

    await service.execute(createDto);

    expect(ruralProducerRepository.findById).toBeDefined();
    expect(propertyRepository.create).toBeDefined();
  });

  it('should fail when rural producer not found', async () => {
    const createDto: CreatePropertyDto = {
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
      totalAreaHectares: 100,
      arableAreaHectares: 60,
      vegetationAreaHectares: 40,
      ruralProducerId: '123',
    };

    ruralProducerRepository.findById.mockResolvedValue(null);

    await expect(service.execute(createDto)).rejects.toEqual(
      new NotFoundException('Produtor rural não encontrado.'),
    );
  });
});
