import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRuralProducerController } from './update-rural-producer.controller';
import { UpdateRuralProducerService } from '../../services/update-rural-producer/update-rural-producer.service';
import { UpdateRuralProducerDto } from '../../dtos/update-rural-producer.dto';

describe('UpdateRuralProducerController', () => {
  let controller: UpdateRuralProducerController;
  let service: UpdateRuralProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateRuralProducerController],
      providers: [
        {
          provide: UpdateRuralProducerService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateRuralProducerController>(
      UpdateRuralProducerController,
    );
    service = module.get<UpdateRuralProducerService>(
      UpdateRuralProducerService,
    );
  });

  describe('update controller rural producer', () => {
    it('should successfully update a rural producer', async () => {
      const id = '4bda4dd3-abd0-4303-8d02-f368dfafa253';
      const updateRuralProducerDto: UpdateRuralProducerDto = {
        name: 'Lucas Farias',
        cpfOrCnpj: '799.231.180-96',
      };

      jest.spyOn(service, 'execute').mockResolvedValue();

      await controller.update(id, updateRuralProducerDto);

      expect(service.execute).toHaveBeenCalledTimes(1);
      expect(service.execute).toHaveBeenCalledWith(id, updateRuralProducerDto);
    });
  });
});
