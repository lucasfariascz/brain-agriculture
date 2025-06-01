import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda 1',
  })
  @IsNotEmpty({ message: 'Nome da fazenda não informado.' })
  @IsString({ message: 'Nome da fazenda inválido. Informe um nome válido.' })
  farmName: string;

  @ApiProperty({
    description: 'Cidade da fazenda',
    example: 'São Paulo',
  })
  @IsNotEmpty({ message: 'Cidade da fazenda não informada.' })
  @IsString({
    message: 'Cidade da fazenda inválida. Informe uma cidade válida.',
  })
  farmCity: string;

  @ApiProperty({
    description: 'Estado da fazenda',
    example: 'SP',
  })
  @IsNotEmpty({ message: 'Estado da fazenda não informado.' })
  @IsString({
    message: 'Estado da fazenda inválido. Informe um estado válido.',
  })
  farmState: string;

  @ApiProperty({
    description: 'Área total da fazenda',
    example: 100,
  })
  @IsNotEmpty({ message: 'Área total da fazenda não informada.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    {
      message: 'Área total da fazenda inválida. Informe uma área válida.',
    },
  )
  @Min(0, {
    message: 'Área total da fazenda inválida. Informe uma área válida.',
  })
  totalAreaHectares: number;

  @ApiProperty({
    description: 'Área arável da fazenda',
    example: 100,
  })
  @IsNotEmpty({ message: 'Área arável da fazenda não informada.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    {
      message: 'Área arável da fazenda inválida. Informe uma área válida.',
    },
  )
  @Min(0, {
    message: 'Área arável da fazenda inválida. Informe uma área válida.',
  })
  arableAreaHectares: number;

  @ApiProperty({
    description: 'Área de vegetação da fazenda',
    example: 100,
  })
  @IsNotEmpty({ message: 'Área de vegetação da fazenda não informada.' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    {
      message:
        'Área de vegetação da fazenda inválida. Informe uma área válida.',
    },
  )
  @Min(0, {
    message: 'Área de vegetação da fazenda inválida. Informe uma área válida.',
  })
  vegetationAreaHectares: number;

  @ApiProperty({
    description: 'ID do produtor rural',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  ruralProducerId: string;
}
