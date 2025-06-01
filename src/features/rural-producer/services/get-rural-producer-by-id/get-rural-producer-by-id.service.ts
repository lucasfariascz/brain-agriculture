import { Injectable, NotFoundException } from '@nestjs/common';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { RuralProducerReponseDto } from '../../dtos/rural-producer.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetRuralProducerByIdService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(id: string): Promise<RuralProducerReponseDto> {
    const findRuralProducerEntity =
      await this.ruralProducerRepository.findById(id);

    if (!findRuralProducerEntity) {
      throw new NotFoundException('Produtor rural não encontrado.');
    }

    return plainToInstance(RuralProducerReponseDto, findRuralProducerEntity, {
      excludeExtraneousValues: true,
    });
  }
}
