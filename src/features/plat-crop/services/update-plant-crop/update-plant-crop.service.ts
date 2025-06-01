import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePlantCropDto } from '../../dtos/update-plant-crop.dto';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { PropertyRepository } from '../../../property/repositories/property.repository';
import { HarvestRepository } from '../../../harvest/repositories/harvest.repository';
import { PlantCropEntity } from '../../entities/plant-crop.entity';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class UpdatePlantCropService {
  constructor(
    private readonly plantCropRepository: PlantCropRepository,
    private readonly propertyRepository: PropertyRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  @LogExecution()
  async execute(
    id: string,
    updatePlantCropDto: UpdatePlantCropDto,
  ): Promise<void> {
    const findPlantCropEntity = await this.plantCropRepository.findById(id);

    if (!isNotNullOrUndefined(findPlantCropEntity)) {
      throw new NotFoundException('Cultura plantada não encontrada');
    }

    const plantCropEntity = new PlantCropEntity();

    plantCropEntity.name = updatePlantCropDto.name;

    const findPropertyEntity = await this.propertyRepository.findById(
      updatePlantCropDto.propertyId,
    );

    if (!isNotNullOrUndefined(findPropertyEntity)) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    plantCropEntity.property = findPropertyEntity;

    const findHarvestEntity = await this.harvestRepository.findById(
      updatePlantCropDto.harvestId,
    );

    if (!isNotNullOrUndefined(findHarvestEntity)) {
      throw new NotFoundException('Safra não encontrada');
    }

    plantCropEntity.harvest = findHarvestEntity;

    await this.plantCropRepository.update(id, plantCropEntity);
  }
}
