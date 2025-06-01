import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from '../../repositories/property.repository';
import { PlantCropRepository } from '../../../plat-crop/repositories/plant-crop.repository';
import { HarvestRepository } from '../../../harvest/repositories/harvest.repository';
import { PlantCropEntity } from '../../../plat-crop/entities/plant-crop.entity';
import { v4 as uuidv4 } from 'uuid';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { AddPlantCropsToPropertyDto } from '../../dtos/add-plant-crops-to-property.dto';

@Injectable()
export class AddPlantCropsToPropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly plantCropRepository: PlantCropRepository,
    private readonly harvestRepository: HarvestRepository,
  ) {}

  async execute(
    id: string,
    addPlantCropsToPropertyDto: AddPlantCropsToPropertyDto,
  ): Promise<void> {
    if (
      addPlantCropsToPropertyDto.plantCrops &&
      addPlantCropsToPropertyDto.plantCrops.length > 0
    ) {
      for (const plantCrop of addPlantCropsToPropertyDto.plantCrops) {
        const findHarvestEntity = await this.harvestRepository.findById(
          plantCrop.harvestId,
        );
        if (!isNotNullOrUndefined(findHarvestEntity)) {
          throw new NotFoundException(
            `Safra com ID ${plantCrop.harvestId} não encontrada`,
          );
        }
      }
    }

    const findPropertyEntity = await this.propertyRepository.findById(id);
    if (!isNotNullOrUndefined(findPropertyEntity)) {
      throw new NotFoundException(`Propriedade com ID ${id} não encontrada`);
    }

    if (
      addPlantCropsToPropertyDto.plantCrops &&
      addPlantCropsToPropertyDto.plantCrops.length > 0
    ) {
      for (const plantCropData of addPlantCropsToPropertyDto.plantCrops) {
        const findHarvestEntity = await this.harvestRepository.findById(
          plantCropData.harvestId,
        );

        const plantCropEntity = new PlantCropEntity();
        plantCropEntity.id = uuidv4();
        plantCropEntity.name = plantCropData.name;
        plantCropEntity.property = findPropertyEntity;
        plantCropEntity.harvest = findHarvestEntity!;

        await this.plantCropRepository.create(plantCropEntity);
      }
    }
  }
}
