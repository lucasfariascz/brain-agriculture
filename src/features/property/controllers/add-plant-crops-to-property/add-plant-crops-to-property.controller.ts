import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddPlantCropsToPropertyDto } from '../../dtos/add-plant-crops-to-property.dto';
import { AddPlantCropsToPropertyService } from '../../services/add-plant-crops-to-property/add-plant-crops-to-property.service';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('add-plant-crops-to-property')
export class AddPlantCropsToPropertyCropController {
  constructor(
    private readonly addPlantCropsToPropertyService: AddPlantCropsToPropertyService,
  ) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOperation({
    summary: 'Adicionar culturas à propriedade',
    description:
      'Adiciona uma lista de culturas plantadas a uma propriedade específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade onde as culturas serão adicionadas',
    example: 'c1e55996-1d6f-492a-83a6-b65434d9712a',
  })
  @ApiBody({
    type: AddPlantCropsToPropertyDto,
    description: 'Lista de culturas a serem adicionadas à propriedade',
  })
  @ApiResponse({
    status: 201,
    description: 'Culturas adicionadas à propriedade com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
  })
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
