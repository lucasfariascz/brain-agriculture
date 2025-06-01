import { Controller, Get, Param } from '@nestjs/common';
import { PlantCropResponseDto } from '../../dtos/plant-crop.response.dto';
import { GetPlantCropByIdService } from '../../services/get-plant-crop-by-id/get-plant-crop-by-id.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-plant-crop-by-id')
export class GetPlantCropByIdController {
  constructor(
    private readonly getPlantCropByIdService: GetPlantCropByIdService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOkResponse({
    type: PlantCropResponseDto,
  })
  @Get(':id')
  @LogExecution()
  async getById(@Param('id') id: string): Promise<PlantCropResponseDto> {
    return this.getPlantCropByIdService.execute(id);
  }
}
