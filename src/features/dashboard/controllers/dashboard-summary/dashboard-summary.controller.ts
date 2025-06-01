import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardSummaryDto } from '../../dtos/dashboard-summary.dto';
import { DashboardSummaryService } from '../../services/dashboard-summary/dashboard-summary.service';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('dashboard-summary')
export class DashboardSummaryController {
  constructor(
    private readonly dashboardSummaryService: DashboardSummaryService,
  ) {}

  @ApiTags('Dashboard')
  @ApiOkResponse({
    type: DashboardSummaryDto,
  })
  @Get()
  @LogExecution()
  async getSummary(): Promise<DashboardSummaryDto> {
    return this.dashboardSummaryService.execute();
  }
}
