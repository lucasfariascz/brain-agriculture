import { Controller, Get, Param } from '@nestjs/common';
import { HarvestResponseDto } from '../../dtos/harvest.response.dto';
import { GetHarvestByIdService } from '../../services/get-harvest-by-id/get-harvest-by-id.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-harvest-by-id')
export class GetHarvestByIdController {
  constructor(private readonly getHarvestByIdService: GetHarvestByIdService) {}

  @ApiTags('Harvest - Safra')
  @ApiOkResponse({
    type: HarvestResponseDto,
  })
  @Get(':id')
  @LogExecution()
  async getById(@Param('id') id: string): Promise<HarvestResponseDto> {
    return this.getHarvestByIdService.execute(id);
  }
}
