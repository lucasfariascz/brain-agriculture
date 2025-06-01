import { ApiProperty } from '@nestjs/swagger';

export class DashboardAreaDto {
  @ApiProperty({ description: 'Área agricultável em hectares' })
  arableAreaHectares: number;

  @ApiProperty({ description: 'Área de vegetação em hectares' })
  vegetationAreaHectares: number;

  @ApiProperty({ description: 'Percentual de área agricultável' })
  arablePercentage: number;

  @ApiProperty({ description: 'Percentual de área de vegetação' })
  vegetationPercentage: number;
}
