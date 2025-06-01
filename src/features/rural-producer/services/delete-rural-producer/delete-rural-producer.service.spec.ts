import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRuralProducerService } from './delete-rural-producer.service';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { NotFoundException } from '@nestjs/common';
import { RuralProducerEntity } from '../../entities/rural-producer.entity';

describe('DeleteRuralProducerService', () => {
  let deleteRuralProducerService: DeleteRuralProducerService;
  let repository: jest.Mocked<RuralProducerRepository>;

  beforeEach(async () => {
    repository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteRuralProducerService,
        {
          provide: RuralProducerRepository,
          useValue: repository,
        },
      ],
    }).compile();

    deleteRuralProducerService = module.get<DeleteRuralProducerService>(
      DeleteRuralProducerService,
    );
  });

  describe('execute', () => {
    it('should successfully delete a rural producer', async () => {
      const id = '123';
      const ruralProducerEntity = {
        id,
        name: 'John Doe',
        cpfOrCnpj: '123.456.789-00',
      } as RuralProducerEntity;

      repository.findById.mockResolvedValueOnce(ruralProducerEntity);
      repository.delete.mockResolvedValueOnce(undefined);

      await deleteRuralProducerService.execute(id);

      expect(repository.findById).toHaveBeenCalledTimes(1);
      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when rural producer does not exist', async () => {
      const id = '123';

      repository.findById.mockResolvedValueOnce(null);

      await expect(deleteRuralProducerService.execute(id)).rejects.toThrow(
        new NotFoundException('Produtor rural não encontrado..'),
      );

      expect(repository.findById).toHaveBeenCalledTimes(1);
      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
