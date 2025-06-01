import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class PlantCropDto {
  @ApiProperty({
    description: 'Nome da cultura',
    example: 'Soja',
  })
  @IsNotEmpty({ message: 'Nome da cultura não informado.' })
  @IsString({ message: 'Nome da cultura inválido. Informe um nome válido.' })
  name: string;

  @ApiProperty({
    description: 'ID da safra',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID da safra não informado.' })
  @IsString({ message: 'ID da safra inválido.' })
  harvestId: string;
}

export class AddPlantCropsToPropertyDto {
  @ApiProperty({
    description: 'Culturas',
    example: [
      { name: 'Soja', harvestId: '123e4567-e89b-12d3-a456-426614174000' },
    ],
  })
  @IsOptional()
  @IsArray({ message: 'Culturas devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => PlantCropDto)
  plantCrops?: PlantCropDto[];
}
