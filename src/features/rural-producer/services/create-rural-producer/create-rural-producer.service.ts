import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRuralProducerDto } from '../../dtos/create-rural-producer.dto';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { v4 as uuidv4 } from 'uuid';
import { RuralProducerEntity } from '../../entities/rural-producer.entity';

@Injectable()
export class CreateRuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(createRuralProducerDto: CreateRuralProducerDto): Promise<void> {
    const findRuralProducerEntity =
      await this.ruralProducerRepository.findByCpfOrCnpj(
        createRuralProducerDto.cpfOrCnpj,
      );

    if (findRuralProducerEntity) {
      throw new BadRequestException('Produtor rural já existe.');
    }

    const ruralProducerEntity = new RuralProducerEntity();
    ruralProducerEntity.id = uuidv4();
    ruralProducerEntity.name = createRuralProducerDto.name;
    ruralProducerEntity.cpfOrCnpj = createRuralProducerDto.cpfOrCnpj;

    await this.ruralProducerRepository.create(ruralProducerEntity);
  }
}
