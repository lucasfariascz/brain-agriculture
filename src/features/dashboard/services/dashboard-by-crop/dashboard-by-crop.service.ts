import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../repositories/dashboard.repository';
import { DashboardByCropDto } from '../../dtos/dashboard-by-crop.dto';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardByCropService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  @LogExecution()
  async execute(): Promise<DashboardByCropDto[]> {
    const [farmsByCrop, totalFarms] = await Promise.all([
      this.dashboardRepository.getFarmsByCrop(),
      this.dashboardRepository.getTotalFarms(),
    ]);

    return farmsByCrop.map((crop) => ({
      cropName: crop.cropName,
      farmsCount: crop.farmsCount,
      percentage: totalFarms > 0 ? (crop.farmsCount / totalFarms) * 100 : 0,
    }));
  }
}
