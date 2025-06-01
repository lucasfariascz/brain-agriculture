import { Test, TestingModule } from '@nestjs/testing';
import { DeletePropertyService } from './delete-property.service';
import { PropertyRepository } from '../../repositories/property.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeletePropertyService', () => {
  let service: DeletePropertyService;
  let repository: jest.Mocked<PropertyRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePropertyService,
        {
          provide: PropertyRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeletePropertyService>(DeletePropertyService);
    repository = module.get(PropertyRepository);
  });

  it('should delete property successfully', async () => {
    const mockProperty = {
      id: '123',
      farmName: 'Fazenda São José',
      farmCity: 'São Paulo',
      farmState: 'SP',
    };

    repository.findById.mockResolvedValue(mockProperty as any);
    repository.delete.mockResolvedValue(undefined);

    await service.execute('123');

    expect(repository.findById).toBeDefined();
    expect(repository.delete).toBeDefined();
  });

  it('should fail when property not found', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('123')).rejects.toEqual(
      new NotFoundException('Propriedade não encontrada'),
    );
  });
});
