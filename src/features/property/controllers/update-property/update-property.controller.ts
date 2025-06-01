import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdatePropertyDto } from '../../dtos/update-property.dto';
import { UpdatePropertyService } from '../../services/update-property/update-property.service';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('update-property')
export class UpdatePropertyController {
  constructor(private readonly updatePropertyService: UpdatePropertyService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOperation({
    summary: 'Atualizar propriedade',
    description: 'Atualiza os dados de uma propriedade agrícola existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade a ser atualizada',
    example: 'c1e55996-1d6f-492a-83a6-b65434d9712a',
  })
  @ApiBody({
    type: UpdatePropertyDto,
    description: 'Dados atualizados da propriedade',
  })
  @ApiResponse({
    status: 200,
    description: 'Propriedade atualizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
  })
  @Put(':id')
  async execute(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<void> {
    await this.updatePropertyService.execute(id, updatePropertyDto);
  }
}
