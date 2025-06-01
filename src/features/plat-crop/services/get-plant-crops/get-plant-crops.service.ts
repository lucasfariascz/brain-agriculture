import { Injectable } from '@nestjs/common';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { PlantCropResponseDto } from '../../dtos/plant-crop.response.dto';
import { plainToInstance } from 'class-transformer';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class GetPlantCropsService {
  constructor(private readonly plantCropRepository: PlantCropRepository) {}

  @LogExecution()
  async execute(): Promise<PlantCropResponseDto[]> {
    const findPlantCropsEntity = await this.plantCropRepository.findAll();

    return plainToInstance(PlantCropResponseDto, findPlantCropsEntity, {
      excludeExtraneousValues: true,
    });
  }
}
