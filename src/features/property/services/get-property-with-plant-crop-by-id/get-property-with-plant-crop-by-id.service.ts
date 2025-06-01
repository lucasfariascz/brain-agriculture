import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from '../../repositories/property.repository';
import { PropertyWithPlantCropResponseDto } from '../../dtos/property-with-plant-crop.response.dto';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetPropertyWithPlantCropByIdService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string): Promise<PropertyWithPlantCropResponseDto> {
    const findPropertyEntity = await this.propertyRepository.findById(id);

    if (!isNotNullOrUndefined(findPropertyEntity)) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    return plainToInstance(
      PropertyWithPlantCropResponseDto,
      findPropertyEntity,
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    );
  }
}
