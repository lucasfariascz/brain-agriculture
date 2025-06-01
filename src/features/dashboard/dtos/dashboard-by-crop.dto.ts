import { ApiProperty } from '@nestjs/swagger';

export class DashboardByCropDto {
  @ApiProperty({ description: 'Nome da cultura' })
  cropName: string;

  @ApiProperty({ description: 'Total de fazendas que plantam esta cultura' })
  farmsCount: number;

  @ApiProperty({ description: 'Percentual do total de fazendas' })
  percentage: number;
}
