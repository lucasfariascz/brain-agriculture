import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardByCropDto } from '../../dtos/dashboard-by-crop.dto';
import { DashboardByCropService } from '../../services/dashboard-by-crop/dashboard-by-crop.service';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('dashboard-by-crop')
export class DashboardByCropController {
  constructor(
    private readonly dashboardByCropService: DashboardByCropService,
  ) {}

  @ApiTags('Dashboard')
  @ApiOkResponse({
    type: DashboardByCropDto,
    isArray: true,
  })
  @Get()
  @LogExecution()
  async getByCrop(): Promise<DashboardByCropDto[]> {
    return this.dashboardByCropService.execute();
  }
}
