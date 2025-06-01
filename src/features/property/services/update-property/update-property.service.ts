import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PropertyEntity } from '../../entities/property.entity';
import { PropertyRepository } from '../../repositories/property.repository';
import { UpdatePropertyDto } from '../../dtos/update-property.dto';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';

@Injectable()
export class UpdatePropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<void> {
    const findPropertyEntity = await this.propertyRepository.findById(id);

    if (!isNotNullOrUndefined(findPropertyEntity)) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    const totalUsedArea =
      updatePropertyDto.arableAreaHectares +
      updatePropertyDto.vegetationAreaHectares;
    if (updatePropertyDto.totalAreaHectares < totalUsedArea) {
      throw new BadRequestException(
        `A área total (${updatePropertyDto.totalAreaHectares} hectares) deve ser maior ou igual à soma da área agricultável (${updatePropertyDto.arableAreaHectares} hectares) e área de vegetação (${updatePropertyDto.vegetationAreaHectares} hectares). Total utilizado: ${totalUsedArea} hectares.`,
      );
    }

    const propertyEntity = new PropertyEntity();
    propertyEntity.farmName = updatePropertyDto.farmName;
    propertyEntity.farmCity = updatePropertyDto.farmCity;
    propertyEntity.farmState = updatePropertyDto.farmState;
    propertyEntity.totalAreaHectares = updatePropertyDto.totalAreaHectares;
    propertyEntity.arableAreaHectares = updatePropertyDto.arableAreaHectares;
    propertyEntity.vegetationAreaHectares =
      updatePropertyDto.vegetationAreaHectares;

    await this.propertyRepository.update(id, propertyEntity);
  }
}
