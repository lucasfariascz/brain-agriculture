import { Controller, Get } from '@nestjs/common';
import { PlantCropResponseDto } from '../../dtos/plant-crop.response.dto';
import { GetPlantCropsService } from '../../services/get-plant-crops/get-plant-crops.service';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-plant-crops')
export class GetPlantCropsController {
  constructor(private readonly getPlantCropsService: GetPlantCropsService) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOperation({
    summary: 'Listar todas as culturas plantadas',
    description:
      'Retorna uma lista com todas as culturas plantadas cadastradas no sistema',
  })
  @ApiOkResponse({
    type: PlantCropResponseDto,
    isArray: true,
    description: 'Lista de culturas plantadas retornada com sucesso',
  })
  @Get()
  @LogExecution()
  async getAll(): Promise<PlantCropResponseDto[]> {
    return this.getPlantCropsService.execute();
  }
}
