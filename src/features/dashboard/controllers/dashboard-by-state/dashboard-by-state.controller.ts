import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardByStateDto } from '../../dtos/dashboard-by-state.dto';
import { DashboardByStateService } from '../../services/dashboard-by-state/dashboard-by-state.service';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('dashboard-by-state')
export class DashboardByStateController {
  constructor(
    private readonly dashboardByStateService: DashboardByStateService,
  ) {}

  @ApiTags('Dashboard')
  @ApiOkResponse({
    type: DashboardByStateDto,
    isArray: true,
  })
  @Get()
  @LogExecution()
  async getByState(): Promise<DashboardByStateDto[]> {
    return this.dashboardByStateService.execute();
  }
}
