import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardAreaTotalService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  @LogExecution()
  async execute(): Promise<{ totalAreaHectares: number }> {
    const areas = await this.dashboardRepository.getTotalAreas();
    return { totalAreaHectares: areas.totalAreaHectares };
  }
}
