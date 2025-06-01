import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardAreaTotalService } from '../../services/dashboard-area-total/dashboard-area-total.service';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('dashboard-area-total')
export class DashboardAreaTotalController {
  constructor(
    private readonly dashboardAreaTotalService: DashboardAreaTotalService,
  ) {}

  @ApiTags('Dashboard')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        totalAreaHectares: { type: 'number' },
      },
    },
  })
  @Get()
  @LogExecution()
  async getAreaTotal(): Promise<{ totalAreaHectares: number }> {
    return this.dashboardAreaTotalService.execute();
  }
}
