import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({ description: 'Total de fazendas' })
  totalFarms: number;

  @ApiProperty({ description: 'Total de área em hectares' })
  totalAreaHectares: number;

  @ApiProperty({ description: 'Área agricultável em hectares' })
  arableAreaHectares: number;

  @ApiProperty({ description: 'Área de vegetação em hectares' })
  vegetationAreaHectares: number;

  @ApiProperty({ description: 'Total de produtores rurais' })
  totalProducers: number;
}
