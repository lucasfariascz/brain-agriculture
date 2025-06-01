import { Controller, Get, Param } from '@nestjs/common';
import { PropertyWithPlantCropResponseDto } from '../../dtos/property-with-plant-crop.response.dto';
import { GetPropertyWithPlantCropByIdService } from '../../services/get-property-with-plant-crop-by-id/get-property-with-plant-crop-by-id.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('get-property-with-plant-crop-by-id')
export class GetPropertyWithPlantCropByIdController {
  constructor(
    private readonly getPropertyWithPlantCropByIdService: GetPropertyWithPlantCropByIdService,
  ) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOperation({
    summary: 'Buscar propriedade com suas culturas plantadas',
    description:
      'Retorna os dados de uma propriedade específica junto com todas as suas culturas plantadas',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade cujas culturas plantadas serão buscadas',
    example: 'c1e55996-1d6f-492a-83a6-b65434d9712a',
  })
  @ApiOkResponse({
    type: PropertyWithPlantCropResponseDto,
    description: 'Propriedade com culturas plantadas encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
  })
  @Get('/:id/plant-crop')
  async getPropertyWithPlantCropById(
    @Param('id') id: string,
  ): Promise<PropertyWithPlantCropResponseDto> {
    return this.getPropertyWithPlantCropByIdService.execute(id);
  }
}
