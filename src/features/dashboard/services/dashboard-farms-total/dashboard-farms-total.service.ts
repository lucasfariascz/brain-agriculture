import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardFarmsTotalService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  @LogExecution()
  async execute(): Promise<{ totalFarms: number }> {
    const totalFarms = await this.dashboardRepository.getTotalFarms();
    return { totalFarms };
  }
}
