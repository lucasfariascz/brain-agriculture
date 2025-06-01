import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PropertyResponseDto {
  @ApiProperty({
    description: 'ID da propriedade',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda 1',
  })
  @Expose()
  farmName: string;

  @ApiProperty({
    description: 'Cidade da fazenda',
    example: 'São Paulo',
  })
  @Expose()
  farmCity: string;

  @ApiProperty({
    description: 'Estado da fazenda',
    example: 'SP',
  })
  @Expose()
  farmState: string;

  @ApiProperty({
    description: 'Área total da fazenda',
    example: 100,
  })
  @Expose()
  totalAreaHectares: number;

  @ApiProperty({
    description: 'Área arável da fazenda',
    example: 100,
  })
  @Expose()
  arableAreaHectares: number;

  @ApiProperty({
    description: 'Área de vegetação da fazenda',
    example: 100,
  })
  @Expose()
  vegetationAreaHectares: number;

  @ApiProperty({
    description: 'Data de criação da propriedade',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  creationTime: Date;

  @ApiProperty({
    description: 'Data de última modificação da propriedade',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  lastModificationTime: Date;
}
