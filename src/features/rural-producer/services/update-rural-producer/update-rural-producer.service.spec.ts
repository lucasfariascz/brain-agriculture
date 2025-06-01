import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRuralProducerService } from './update-rural-producer.service';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { NotFoundException } from '@nestjs/common';
import { RuralProducerEntity } from '../../entities/rural-producer.entity';
import { UpdateRuralProducerDto } from '../../dtos/update-rural-producer.dto';

describe('UpdateRuralProducerService', () => {
  let updateRuralProducerService: UpdateRuralProducerService;
  let ruralProducerRepository: RuralProducerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateRuralProducerService,
        {
          provide: RuralProducerRepository,
          useValue: {
            update: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    updateRuralProducerService = module.get<UpdateRuralProducerService>(
      UpdateRuralProducerService,
    );

    ruralProducerRepository = module.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
  });

  describe('update service rural producer', () => {
    it('should update a rural producer successfully', async () => {
      const id = '4bda4dd3-abd0-4303-8d02-f368dfafa253';
      const updateRuralProducerDto = {
        name: 'Lucas Faraias',
        cpfOrCnpj: '799.231.180-96',
      } as UpdateRuralProducerDto;

      const ruralProducerEntity: RuralProducerEntity = {
        id,
        name: 'John Doe',
        cpfOrCnpj: '799.231.180-96',
        properties: [],
        creationTime: new Date(),
      };

      const mockFindById = jest
        .spyOn(ruralProducerRepository, 'findById')
        .mockResolvedValue(ruralProducerEntity);

      const mockUpdate = jest
        .spyOn(ruralProducerRepository, 'update')
        .mockResolvedValue();

      await updateRuralProducerService.execute(id, updateRuralProducerDto);

      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(mockFindById).toHaveBeenCalledWith(id);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledWith(id, updateRuralProducerDto);
      
    });

    it('should throw a NotFoundException if the rural producer does not exist', async () => {
      const id = 'non-existent-id';
      const updateRuralProducerDto = {
        name: 'Lucas Faraias',
        cpfOrCnpj: '799.231.180-96',
      };

      const mockFindById = jest
        .spyOn(ruralProducerRepository, 'findById')
        .mockResolvedValue(null);

      await expect(
        updateRuralProducerService.execute(id, updateRuralProducerDto),
      ).rejects.toThrow(NotFoundException);

      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(mockFindById).toHaveBeenCalledWith(id);
      (3);
    });
  });
});
