import { Injectable, NotFoundException } from '@nestjs/common';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { UpdateRuralProducerDto } from '../../dtos/update-rural-producer.dto';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { RuralProducerEntity } from '../../entities/rural-producer.entity';

@Injectable()
export class UpdateRuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(
    id: string,
    updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<void> {
    const findRuralProducerByIdEntity =
      await this.ruralProducerRepository.findById(id);

    if (!isNotNullOrUndefined(findRuralProducerByIdEntity)) {
      throw new NotFoundException('Produtor rural não encontrado..');
    }

    const ruralProducerEntity = new RuralProducerEntity();
    ruralProducerEntity.name = updateRuralProducerDto.name;
    ruralProducerEntity.cpfOrCnpj = updateRuralProducerDto.cpfOrCnpj;

    await this.ruralProducerRepository.update(id, ruralProducerEntity);
  }
}
