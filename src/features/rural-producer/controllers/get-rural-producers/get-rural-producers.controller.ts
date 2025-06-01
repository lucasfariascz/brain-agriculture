import { Controller, Get } from '@nestjs/common';
import { RuralProducerReponseDto } from '../../dtos/rural-producer.response.dto';
import { GetRuralProducersService } from '../../services/get-rural-producers/get-rural-producers.service';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('get-rural-producers')
export class GetRuralProducersController {
  constructor(
    private readonly getRuralProducersService: GetRuralProducersService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOperation({
    summary: 'Listar todos os produtores rurais',
    description:
      'Retorna uma lista com todos os produtores rurais cadastrados no sistema',
  })
  @ApiOkResponse({
    type: RuralProducerReponseDto,
    isArray: true,
    description: 'Lista de produtores rurais retornada com sucesso',
  })
  @Get()
  async getAll(): Promise<RuralProducerReponseDto[]> {
    return this.getRuralProducersService.execute();
  }
}
