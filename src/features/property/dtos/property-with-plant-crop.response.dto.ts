import { Expose, Type } from 'class-transformer';
import { PropertyResponseDto } from './property.response.dto';
import { PlantCropResponseDto } from '../../plat-crop/dtos/plant-crop.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PropertyWithPlantCropResponseDto extends PropertyResponseDto {
  @ApiProperty({
    description: 'Culturas',
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Soja',
        propertyId: '123e4567-e89b-12d3-a456-426614174000',
        harvestId: '123e4567-e89b-12d3-a456-426614174000',
        creationTime: '2025-06-01T02:16:34.188Z',
        lastModificationTime: '2025-06-01T02:16:34.188Z',
      },
    ],
  })
  @Expose()
  @Type(() => PlantCropResponseDto)
  plantCrops: PlantCropResponseDto[];
}
