import { Test, TestingModule } from '@nestjs/testing';
import { GetRuralProducersService } from './get-rural-producers.service';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';

describe('GetRuralProducersService', () => {
  let service: GetRuralProducersService;
  let repository: jest.Mocked<RuralProducerRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRuralProducersService,
        {
          provide: RuralProducerRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetRuralProducersService>(GetRuralProducersService);
    repository = module.get(RuralProducerRepository);
  });

  it('should get all rural producers successfully', async () => {
    const mockProducers = [
      {
        id: '123',
        name: 'João Silva',
        cpfOrCnpj: '123.456.789-00',
        creationTime: new Date(),
      },
    ];

    repository.findAll.mockResolvedValue(mockProducers as any);

    const result = await service.execute();

    expect(result).toBeDefined();
    expect(repository.findAll).toBeDefined();
  });

  it('should fail when repository throws error', async () => {
    repository.findAll.mockRejectedValue(new Error('Database error'));

    await expect(service.execute()).rejects.toBeDefined();
  });
});
