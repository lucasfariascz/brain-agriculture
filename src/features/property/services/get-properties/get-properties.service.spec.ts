import { Test, TestingModule } from '@nestjs/testing';
import { GetPropertiesService } from './get-properties.service';
import { PropertyRepository } from '../../repositories/property.repository';

describe('GetPropertiesService', () => {
  let service: GetPropertiesService;
  let repository: jest.Mocked<PropertyRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPropertiesService,
        {
          provide: PropertyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetPropertiesService>(GetPropertiesService);
    repository = module.get(PropertyRepository);
  });

  it('should get all properties successfully', async () => {
    const mockProperties = [
      {
        id: '123',
        farmName: 'Fazenda São José',
        farmCity: 'São Paulo',
        farmState: 'SP',
      },
    ];

    repository.findAll.mockResolvedValue(mockProperties as any);

    const result = await service.execute();

    expect(result).toBeDefined();
    expect(repository.findAll).toBeDefined();
  });

  it('should fail when repository throws error', async () => {
    repository.findAll.mockRejectedValue(new Error('Database error'));

    await expect(service.execute()).rejects.toBeDefined();
  });
});
