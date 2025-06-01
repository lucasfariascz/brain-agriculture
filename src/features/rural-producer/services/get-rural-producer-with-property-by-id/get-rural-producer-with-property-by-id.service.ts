import { plainToInstance } from 'class-transformer';
import { RuralProducerRepository } from '../../repositories/rural-producer.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RuralProducerWithPropertyResponseDto } from '../../dtos/rural-producer-with-property.response.dto';

@Injectable()
export class GetRuralProducerWithPropertyByIdService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(id: string): Promise<RuralProducerWithPropertyResponseDto> {
    const findRuralProducerEntity =
      await this.ruralProducerRepository.findById(id);

    if (!findRuralProducerEntity) {
      throw new NotFoundException('Produtor rural não encontrado.');
    }

    return plainToInstance(
      RuralProducerWithPropertyResponseDto,
      findRuralProducerEntity,
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    );
  }
}
