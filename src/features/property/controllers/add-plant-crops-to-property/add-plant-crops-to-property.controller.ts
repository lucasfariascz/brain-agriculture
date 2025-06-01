import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddPlantCropsToPropertyDto } from '../../dtos/add-plant-crops-to-property.dto';
import { AddPlantCropsToPropertyService } from '../../services/add-plant-crops-to-property/add-plant-crops-to-property.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('add-plant-crops-to-property')
export class AddPlantCropsToPropertyCropController {
  constructor(
    private readonly addPlantCropsToPropertyService: AddPlantCropsToPropertyService,
  ) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @Post(':id/plant-crops')
  async addPlantCropsToProperty(
    @Param('id') id: string,
    @Body() addPlantCropsToPropertyDto: AddPlantCropsToPropertyDto,
  ): Promise<void> {
    await this.addPlantCropsToPropertyService.execute(
      id,
      addPlantCropsToPropertyDto,
    );
  }
}
