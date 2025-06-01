import { Controller, Get, Param } from '@nestjs/common';
import { RuralProducerWithPropertyResponseDto } from '../../dtos/rural-producer-with-property.response.dto';
import { GetRuralProducerWithPropertyByIdService } from '../../services/get-rural-producer-with-property-by-id/get-rural-producer-with-property-by-id.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('get-rural-producer-with-property-by-id')
export class GetRuralProducerWithPropertyByIdController {
  constructor(
    private readonly getRuralProducerWithPropertyByIdService: GetRuralProducerWithPropertyByIdService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOperation({
    summary: 'Buscar produtor rural com suas propriedades',
    description:
      'Retorna os dados de um produtor rural específico junto com todas as suas propriedades',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor rural cujas propriedades serão buscadas',
    example: '59af6bba-dc6a-4fcc-9673-45b40b7be51c',
  })
  @ApiOkResponse({
    type: RuralProducerWithPropertyResponseDto,
    description: 'Produtor rural com propriedades encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produtor rural não encontrado',
  })
  @Get('/:id/property')
  async getRuralProducerWithPropertyById(
    @Param('id') id: string,
  ): Promise<RuralProducerWithPropertyResponseDto> {
    return this.getRuralProducerWithPropertyByIdService.execute(id);
  }
}
