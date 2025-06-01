import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdatePlantCropDto } from '../../dtos/update-plant-crop.dto';
import { UpdatePlantCropService } from '../../services/update-plant-crop/update-plant-crop.service';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('update-plant-crop')
export class UpdatePlantCropController {
  constructor(
    private readonly updatePlantCropService: UpdatePlantCropService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOperation({
    summary: 'Atualizar cultura plantada',
    description: 'Atualiza os dados de uma cultura plantada existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da cultura plantada a ser atualizada',
    example: 'e1437cce-f708-49cd-8b53-1ba301c774d2',
  })
  @ApiBody({
    type: UpdatePlantCropDto,
    description: 'Dados atualizados da cultura plantada',
  })
  @ApiResponse({
    status: 200,
    description: 'Cultura plantada atualizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @ApiResponse({
    status: 404,
    description: 'Cultura plantada não encontrada',
  })
  @Put(':id')
  @LogExecution()
  async update(
    @Param('id') id: string,
    @Body() updatePlantCropDto: UpdatePlantCropDto,
  ): Promise<void> {
    await this.updatePlantCropService.execute(id, updatePlantCropDto);
  }
}
