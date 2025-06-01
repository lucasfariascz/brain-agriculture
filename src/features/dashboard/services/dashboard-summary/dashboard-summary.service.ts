import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { DashboardSummaryDto } from '../../dtos/dashboard-summary.dto';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardSummaryService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  @LogExecution()
  async execute(): Promise<DashboardSummaryDto> {
    const [totalFarms, totalProducers, areas] = await Promise.all([
      this.dashboardRepository.getTotalFarms(),
      this.dashboardRepository.getTotalProducers(),
      this.dashboardRepository.getTotalAreas(),
    ]);

    return {
      totalFarms,
      totalProducers,
      totalAreaHectares: areas.totalAreaHectares,
      arableAreaHectares: areas.arableAreaHectares,
      vegetationAreaHectares: areas.vegetationAreaHectares,
    };
  }
}
