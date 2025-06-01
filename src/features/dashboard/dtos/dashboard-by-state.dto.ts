import { ApiProperty } from '@nestjs/swagger';

export class DashboardByStateDto {
  @ApiProperty({ description: 'Nome do estado' })
  stateName: string;

  @ApiProperty({ description: 'Total de fazendas no estado' })
  farmsCount: number;

  @ApiProperty({ description: 'Percentual do total de fazendas' })
  percentage: number;
}
