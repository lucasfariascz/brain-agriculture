import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdatePlantCropDto } from '../../dtos/update-plant-crop.dto';
import { UpdatePlantCropService } from '../../services/update-plant-crop/update-plant-crop.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('update-plant-crop')
export class UpdatePlantCropController {
  constructor(
    private readonly updatePlantCropService: UpdatePlantCropService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @Put(':id')
  @LogExecution()
  async update(
    @Param('id') id: string,
    @Body() updatePlantCropDto: UpdatePlantCropDto,
  ): Promise<void> {
    await this.updatePlantCropService.execute(id, updatePlantCropDto);
  }
}
