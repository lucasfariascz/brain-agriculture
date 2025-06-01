import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteHarvestService } from '../../services/delete-harvest/delete-harvest.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('delete-harvest')
export class DeleteHarvestController {
  constructor(private readonly deleteHarvestService: DeleteHarvestService) {}

  @ApiTags('Harvest - Safra')
  @ApiOperation({
    summary: 'Remover safra',
    description: 'Remove uma safra existente do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da safra a ser removida',
    example: 'be89a300-80d3-40c0-8a59-8fb6501a9838',
  })
  @ApiResponse({
    status: 200,
    description: 'Safra removida com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Safra não encontrada',
  })
  @Delete(':id')
  @LogExecution()
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteHarvestService.execute(id);
  }
}
