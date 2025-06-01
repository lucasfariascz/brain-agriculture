import { Controller, Get } from '@nestjs/common';
import { PlantCropResponseDto } from '../../dtos/plant-crop.response.dto';
import { GetPlantCropsService } from '../../services/get-plant-crops/get-plant-crops.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-plant-crops')
export class GetPlantCropsController {
  constructor(private readonly getPlantCropsService: GetPlantCropsService) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOkResponse({
    type: PlantCropResponseDto,
    isArray: true,
  })
  @Get()
  @LogExecution()
  async getAll(): Promise<PlantCropResponseDto[]> {
    return this.getPlantCropsService.execute();
  }
}
