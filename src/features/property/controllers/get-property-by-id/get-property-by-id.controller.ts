import { Controller, Get, Param } from '@nestjs/common';
import { PropertyResponseDto } from '../../dtos/property.response.dto';
import { GetPropertyByIdService } from '../../services/get-property-by-id/get-property-by-id.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('get-property-by-id')
export class GetPropertyByIdController {
  constructor(
    private readonly getPropertyByIdService: GetPropertyByIdService,
  ) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOperation({
    summary: 'Buscar propriedade por ID',
    description:
      'Retorna os dados de uma propriedade agrícola específica pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade a ser buscada',
    example: 'c1e55996-1d6f-492a-83a6-b65434d9712a',
  })
  @ApiOkResponse({
    type: PropertyResponseDto,
    description: 'Propriedade encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.getPropertyByIdService.execute(id);
  }
}
