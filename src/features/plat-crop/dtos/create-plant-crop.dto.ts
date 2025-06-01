import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlantCropDto {
  @ApiProperty({
    description: 'Nome da cultura',
    example: 'Soja',
  })
  @IsNotEmpty({ message: 'Nome da cultura não informado.' })
  @IsString({ message: 'Nome da cultura inválido. Informe um nome válido.' })
  name: string;

  @ApiProperty({
    description: 'ID da propriedade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID da propriedade não informado.' })
  @IsString({ message: 'ID da propriedade inválido.' })
  propertyId: string;

  @ApiProperty({
    description: 'ID da safra',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID da safra não informado.' })
  @IsString({ message: 'ID da safra inválido.' })
  harvestId: string;
}
