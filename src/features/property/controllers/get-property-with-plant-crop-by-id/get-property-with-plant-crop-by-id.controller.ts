import { Controller, Get, Param } from '@nestjs/common';
import { PropertyWithPlantCropResponseDto } from '../../dtos/property-with-plant-crop.response.dto';
import { GetPropertyWithPlantCropByIdService } from '../../services/get-property-with-plant-crop-by-id/get-property-with-plant-crop-by-id.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('get-property-with-plant-crop-by-id')
export class GetPropertyWithPlantCropByIdController {
  constructor(
    private readonly getPropertyWithPlantCropByIdService: GetPropertyWithPlantCropByIdService,
  ) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOkResponse({
    type: PropertyWithPlantCropResponseDto,
  })
  @Get('/:id/plant-crop')
  async getPropertyWithPlantCropById(
    @Param('id') id: string,
  ): Promise<PropertyWithPlantCropResponseDto> {
    return this.getPropertyWithPlantCropByIdService.execute(id);
  }
}
