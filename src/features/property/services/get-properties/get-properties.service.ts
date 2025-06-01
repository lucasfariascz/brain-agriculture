import { Injectable } from '@nestjs/common';
import { PropertyRepository } from '../../repositories/property.repository';
import { PropertyResponseDto } from '../../dtos/property.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetPropertiesService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(): Promise<PropertyResponseDto[]> {
    const findPropertiesEntity = await this.propertyRepository.findAll();
    return plainToInstance(PropertyResponseDto, findPropertiesEntity, {
      excludeExtraneousValues: true,
    });
  }
}
