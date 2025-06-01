import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlantCropDto } from '../../dtos/create-plant-crop.dto';
import { CreatePlantCropService } from '../../services/create-plant-crop/create-plant-crop.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('create-plant-crop')
export class CreatePlantCropController {
  constructor(
    private readonly createPlantCropService: CreatePlantCropService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @ApiOperation({
    summary: 'Criar nova cultura plantada',
    description:
      'Cria uma nova cultura plantada vinculada a uma propriedade e safra',
  })
  @ApiBody({
    type: CreatePlantCropDto,
    description: 'Dados da cultura a ser plantada',
  })
  @ApiResponse({
    status: 201,
    description: 'Cultura plantada criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @Post()
  @LogExecution()
  async create(@Body() createPlantCropDto: CreatePlantCropDto): Promise<void> {
    await this.createPlantCropService.execute(createPlantCropDto);
  }
}
