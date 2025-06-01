import { Controller, Get, Param } from '@nestjs/common';
import { PlantCropResponseDto } from '../../dtos/plant-crop.response.dto';
import { GetPlantCropByIdService } from '../../services/get-plant-crop-by-id/get-plant-crop-by-id.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-plant-crop-by-id')
export class GetPlantCropByIdController {
  constructor(
    private readonly getPlantCropByIdService: GetPlantCropByIdService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOperation({
    summary: 'Buscar cultura plantada por ID',
    description:
      'Retorna os dados de uma cultura plantada específica pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da cultura plantada a ser buscada',
    example: 'e1437cce-f708-49cd-8b53-1ba301c774d2',
  })
  @ApiOkResponse({
    type: PlantCropResponseDto,
    description: 'Cultura plantada encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Cultura plantada não encontrada',
  })
  @Get(':id')
  @LogExecution()
  async getById(@Param('id') id: string): Promise<PlantCropResponseDto> {
    return this.getPlantCropByIdService.execute(id);
  }
}
