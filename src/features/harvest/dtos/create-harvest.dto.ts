import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({
    description: 'Ano da safra',
    example: 2021,
  })
  @IsNotEmpty({ message: 'Ano da safra não informado.' })
  @IsNumber({}, { message: 'Ano da safra inválido. Informe um ano válido.' })
  @Min(1900, { message: 'Ano da safra inválido. Informe um ano válido.' })
  year: number;
}
