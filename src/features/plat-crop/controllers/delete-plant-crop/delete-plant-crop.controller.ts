import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePlantCropService } from '../../services/delete-plant-crop/delete-plant-crop.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('delete-plant-crop')
export class DeletePlantCropController {
  constructor(
    private readonly deletePlantCropService: DeletePlantCropService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @Delete(':id')
  @LogExecution()
  async delete(@Param('id') id: string): Promise<void> {
    await this.deletePlantCropService.execute(id);
  }
}
