import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PlantCropResponseDto {
  @ApiProperty({
    description: 'ID da cultura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nome da cultura',
    example: 'Soja',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'ID da propriedade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  propertyId: string;

  @ApiProperty({
    description: 'ID da safra',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  harvestId: string;

  @ApiProperty({
    description: 'Data de criação da cultura',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  creationTime: Date;

  @ApiProperty({
    description: 'Data de última modificação da cultura',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  lastModificationTime: Date;
}
