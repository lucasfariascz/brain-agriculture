import { Injectable, NotFoundException } from '@nestjs/common';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { PlantCropResponseDto } from '../../dtos/plant-crop.response.dto';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { plainToInstance } from 'class-transformer';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class GetPlantCropByIdService {
  constructor(private readonly plantCropRepository: PlantCropRepository) {}

  @LogExecution()
  async execute(id: string): Promise<PlantCropResponseDto> {
    const findPlantCropEntity = await this.plantCropRepository.findById(id);

    if (!isNotNullOrUndefined(findPlantCropEntity)) {
      throw new NotFoundException('Cultura plantada não encontrada');
    }

    return plainToInstance(PlantCropResponseDto, findPlantCropEntity, {
      excludeExtraneousValues: true,
    });
  }
}
