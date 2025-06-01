import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateHarvestDto } from '../../dtos/update-harvest.dto';
import { UpdateHarvestService } from '../../services/update-harvest/update-harvest.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('update-harvest')
export class UpdateHarvestController {
  constructor(private readonly updateHarvestService: UpdateHarvestService) {}

  @ApiTags('Harvest - Safra')
  @Put(':id')
  @LogExecution()
  async update(
    @Param('id') id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ): Promise<void> {
    await this.updateHarvestService.execute(id, updateHarvestDto);
  }
}
