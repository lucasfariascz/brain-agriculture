import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteHarvestService } from '../../services/delete-harvest/delete-harvest.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('delete-harvest')
export class DeleteHarvestController {
  constructor(private readonly deleteHarvestService: DeleteHarvestService) {}

  @ApiTags('Harvest - Safra')
  @Delete(':id')
  @LogExecution()
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteHarvestService.execute(id);
  }
}
