import { Injectable } from '@nestjs/common';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { RuralProducerReponseDto } from '../../dtos/rural-producer.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetRuralProducersService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(): Promise<RuralProducerReponseDto[]> {
    const ruralProducers = await this.ruralProducerRepository.findAll();
    return plainToInstance(RuralProducerReponseDto, ruralProducers, {
      excludeExtraneousValues: true,
    });
  }
}
