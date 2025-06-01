import { Controller, Get } from '@nestjs/common';
import { HarvestResponseDto } from '../../dtos/harvest.response.dto';
import { GetHarvestsService } from '../../services/get-harvests/get-harvests.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-harvests')
export class GetHarvestsController {
  constructor(private readonly getHarvestsService: GetHarvestsService) {}

  @ApiTags('Harvest - Safra')
  @ApiOkResponse({
    type: HarvestResponseDto,
    isArray: true,
  })
  @Get()
  @LogExecution()
  async getAll(): Promise<HarvestResponseDto[]> {
    return this.getHarvestsService.execute();
  }
}
