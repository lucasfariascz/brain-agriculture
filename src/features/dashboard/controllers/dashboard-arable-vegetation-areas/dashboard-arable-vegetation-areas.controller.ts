import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardAreaDto } from '../../dtos/dashboard-area.dto';
import { DashboardArableVegetationAreasService } from '../../services/dashboard-arable-vegetation-areas/dashboard-arable-vegetation-areas.service';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('dashboard-arable-vegetation-areas')
export class DashboardArableVegetationAreasController {
  constructor(
    private readonly dashboardArableVegetationAreasService: DashboardArableVegetationAreasService,
  ) {}

  @ApiTags('Dashboard')
  @ApiOkResponse({
    type: DashboardAreaDto,
  })
  @Get()
  @LogExecution()
  async getArableVegetationAreas(): Promise<DashboardAreaDto> {
    return this.dashboardArableVegetationAreasService.execute();
  }
}
