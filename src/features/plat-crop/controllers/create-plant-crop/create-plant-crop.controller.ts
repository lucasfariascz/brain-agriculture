import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlantCropDto } from '../../dtos/create-plant-crop.dto';
import { CreatePlantCropService } from '../../services/create-plant-crop/create-plant-crop.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('create-plant-crop')
export class CreatePlantCropController {
  constructor(
    private readonly createPlantCropService: CreatePlantCropService,
  ) {}

  @ApiTags('Plant Crop - Plantar Colheita')
  @Post()
  @LogExecution()
  async create(@Body() createPlantCropDto: CreatePlantCropDto): Promise<void> {
    await this.createPlantCropService.execute(createPlantCropDto);
  }
}
