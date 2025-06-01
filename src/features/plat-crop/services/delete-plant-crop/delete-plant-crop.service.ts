import { Injectable, NotFoundException } from '@nestjs/common';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DeletePlantCropService {
  constructor(private readonly plantCropRepository: PlantCropRepository) {}

  @LogExecution()
  async execute(id: string): Promise<void> {
    const findPlantCropEntity = await this.plantCropRepository.findById(id);

    if (!isNotNullOrUndefined(findPlantCropEntity)) {
      throw new NotFoundException('Cultura plantada não encontrada');
    }

    await this.plantCropRepository.delete(id);
  }
}
