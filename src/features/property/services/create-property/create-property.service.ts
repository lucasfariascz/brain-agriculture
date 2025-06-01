import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePropertyDto } from '../../dtos/create-property.dto';
import { PropertyRepository } from '../../repositories/property.repository';
import { RuralProducerRepository } from '../../../rural-producer/repositories/rural-producer.repository';
import { PropertyEntity } from '../../entities/property.entity';
import { v4 as uuidv4 } from 'uuid';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';

@Injectable()
export class CreatePropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(createPropertyDto: CreatePropertyDto): Promise<void> {
    const findRuralProducerEntity = await this.ruralProducerRepository.findById(
      createPropertyDto.ruralProducerId,
    );

    if (!isNotNullOrUndefined(findRuralProducerEntity)) {
      throw new NotFoundException('Produtor rural não encontrado.');
    }

    const totalUsedArea =
      createPropertyDto.arableAreaHectares +
      createPropertyDto.vegetationAreaHectares;
    if (createPropertyDto.totalAreaHectares < totalUsedArea) {
      throw new BadRequestException(
        `A área total (${createPropertyDto.totalAreaHectares} hectares) deve ser maior ou igual à soma da área agricultável (${createPropertyDto.arableAreaHectares} hectares) e área de vegetação (${createPropertyDto.vegetationAreaHectares} hectares). Total utilizado: ${totalUsedArea} hectares.`,
      );
    }

    const propertyEntity = new PropertyEntity();
    propertyEntity.id = uuidv4();
    propertyEntity.farmName = createPropertyDto.farmName;
    propertyEntity.farmCity = createPropertyDto.farmCity;
    propertyEntity.farmState = createPropertyDto.farmState;
    propertyEntity.totalAreaHectares = createPropertyDto.totalAreaHectares;
    propertyEntity.arableAreaHectares = createPropertyDto.arableAreaHectares;
    propertyEntity.vegetationAreaHectares =
      createPropertyDto.vegetationAreaHectares;
    propertyEntity.ruralProducer = findRuralProducerEntity;

    await this.propertyRepository.create(propertyEntity);
  }
}
