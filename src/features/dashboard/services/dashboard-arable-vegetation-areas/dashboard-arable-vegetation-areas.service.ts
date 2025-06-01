import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { DashboardAreaDto } from '../../dtos/dashboard-area.dto';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardArableVegetationAreasService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  @LogExecution()
  async execute(): Promise<DashboardAreaDto> {
    const areas = await this.dashboardRepository.getTotalAreas();
    const totalArea = areas.arableAreaHectares + areas.vegetationAreaHectares;

    return {
      arableAreaHectares: areas.arableAreaHectares,
      vegetationAreaHectares: areas.vegetationAreaHectares,
      arablePercentage:
        totalArea > 0 ? (areas.arableAreaHectares / totalArea) * 100 : 0,
      vegetationPercentage:
        totalArea > 0 ? (areas.vegetationAreaHectares / totalArea) * 100 : 0,
    };
  }
}
