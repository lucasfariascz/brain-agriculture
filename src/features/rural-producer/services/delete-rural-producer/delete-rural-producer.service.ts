import { Injectable, NotFoundException } from '@nestjs/common';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';

@Injectable()
export class DeleteRuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const findRuralProducerById =
      await this.ruralProducerRepository.findById(id);

    if (!isNotNullOrUndefined(findRuralProducerById)) {
      throw new NotFoundException('Produtor rural não encontrado..');
    }

    await this.ruralProducerRepository.delete(id);
  }
}
