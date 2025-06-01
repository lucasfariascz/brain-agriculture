import { Test, TestingModule } from '@nestjs/testing';
import { GetRuralProducerWithPropertyByIdService } from './get-rural-producer-with-property-by-id.service';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { NotFoundException } from '@nestjs/common';

describe('GetRuralProducerWithPropertyByIdService', () => {
  let service: GetRuralProducerWithPropertyByIdService;
  let repository: jest.Mocked<RuralProducerRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRuralProducerWithPropertyByIdService,
        {
          provide: RuralProducerRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetRuralProducerWithPropertyByIdService>(
      GetRuralProducerWithPropertyByIdService,
    );
    repository = module.get(RuralProducerRepository);
  });

  it('should get rural producer with property successfully', async () => {
    const mockProducer = {
      id: '123',
      name: 'João Silva',
      cpfOrCnpj: '123.456.789-00',
      properties: [],
    };

    repository.findById.mockResolvedValue(mockProducer as any);

    const result = await service.execute('123');

    expect(result).toBeDefined();
    expect(repository.findById).toBeDefined();
  });

  it('should fail when rural producer not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Produtor rural não encontrado.'),
    );
  });
});
