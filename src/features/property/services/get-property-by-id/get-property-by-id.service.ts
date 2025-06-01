import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from '../../repositories/property.repository';
import { PropertyResponseDto } from '../../dtos/property.response.dto';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetPropertyByIdService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string): Promise<PropertyResponseDto> {
    const findPropertyEntity = await this.propertyRepository.findById(id);

    if (!isNotNullOrUndefined(findPropertyEntity)) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    return plainToInstance(PropertyResponseDto, findPropertyEntity, {
      excludeExtraneousValues: true,
    });
  }
}
