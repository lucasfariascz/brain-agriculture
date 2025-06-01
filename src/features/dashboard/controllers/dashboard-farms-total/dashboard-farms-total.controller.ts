import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardFarmsTotalService } from '../../services/dashboard-farms-total/dashboard-farms-total.service';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('dashboard-farms-total')
export class DashboardFarmsTotalController {
  constructor(
    private readonly dashboardFarmsTotalService: DashboardFarmsTotalService,
  ) {}

  @ApiTags('Dashboard')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        totalFarms: { type: 'number' },
      },
    },
  })
  @Get()
  @LogExecution()
  async getFarmsTotal(): Promise<{ totalFarms: number }> {
    return this.dashboardFarmsTotalService.execute();
  }
}
