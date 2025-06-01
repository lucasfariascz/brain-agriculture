import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { DashboardByStateDto } from '../../dtos/dashboard-by-state.dto';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardByStateService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  @LogExecution()
  async execute(): Promise<DashboardByStateDto[]> {
    const [farmsByState, totalFarms] = await Promise.all([
      this.dashboardRepository.getFarmsByState(),
      this.dashboardRepository.getTotalFarms(),
    ]);

    return farmsByState.map((state) => ({
      stateName: state.farmState,
      farmsCount: state.farmsCount,
      percentage: totalFarms > 0 ? (state.farmsCount / totalFarms) * 100 : 0,
    }));
  }
}
