import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantCropDto } from '../../dtos/create-plant-crop.dto';
import { PlantCropRepository } from '../../repositories/plant-crop.repository';
import { PropertyRepository } from '../../../property/repositories/property.repository';
import { HarvestRepository } from '../../../harvest/repositories/harvest.repository';
import { PlantCropEntity } from '../../entities/plant-crop.entity';
import { v4 as uuidv4 } from 'uuid';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class CreatePlantCropService {
  constructor(
    private readonly plantCropRepository: PlantCropRepository,
    private readonly propertyRepository: PropertyRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  @LogExecution()
  async execute(createPlantCropDto: CreatePlantCropDto): Promise<void> {
    const findPropertyEntity = await this.propertyRepository.findById(
      createPlantCropDto.propertyId,
    );

    if (!isNotNullOrUndefined(findPropertyEntity)) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    const findHarvestEntity = await this.harvestRepository.findById(
      createPlantCropDto.harvestId,
    );

    if (!isNotNullOrUndefined(findHarvestEntity)) {
      throw new NotFoundException('Safra não encontrada');
    }

    const plantCropEntity = new PlantCropEntity();
    plantCropEntity.id = uuidv4();
    plantCropEntity.name = createPlantCropDto.name;
    plantCropEntity.property = findPropertyEntity;
    plantCropEntity.harvest = findHarvestEntity;

    await this.plantCropRepository.create(plantCropEntity);
  }
}
