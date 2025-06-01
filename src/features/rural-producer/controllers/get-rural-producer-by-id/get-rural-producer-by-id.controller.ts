import { Controller, Get, Param } from '@nestjs/common';
import { GetRuralProducerByIdService } from '../../services/get-rural-producer-by-id/get-rural-producer-by-id.service';
import { RuralProducerReponseDto } from '../../dtos/rural-producer.response.dto';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('get-rural-producer-by-id')
export class GetRuralProducerByIdController {
  constructor(
    private readonly getRuralProducerByIdService: GetRuralProducerByIdService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOperation({
    summary: 'Buscar produtor rural por ID',
    description: 'Retorna os dados de um produtor rural específico pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor rural a ser buscado',
    example: '59af6bba-dc6a-4fcc-9673-45b40b7be51c',
  })
  @ApiOkResponse({
    type: RuralProducerReponseDto,
    description: 'Produtor rural encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produtor rural não encontrado',
  })
  @Get(':id')
  async getRuralProducerById(
    @Param('id') id: string,
  ): Promise<RuralProducerReponseDto> {
    return await this.getRuralProducerByIdService.execute(id);
  }
}
