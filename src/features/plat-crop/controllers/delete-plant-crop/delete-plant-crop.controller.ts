import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePlantCropService } from '../../services/delete-plant-crop/delete-plant-crop.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('delete-plant-crop')
export class DeletePlantCropController {
  constructor(
    private readonly deletePlantCropService: DeletePlantCropService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOperation({
    summary: 'Remover cultura plantada',
    description: 'Remove uma cultura plantada existente do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da cultura plantada a ser removida',
    example: 'e1437cce-f708-49cd-8b53-1ba301c774d2',
  })
  @ApiResponse({
    status: 200,
    description: 'Cultura plantada removida com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Cultura plantada não encontrada',
  })
  @Delete(':id')
  @LogExecution()
  async delete(@Param('id') id: string): Promise<void> {
    await this.deletePlantCropService.execute(id);
  }
}
