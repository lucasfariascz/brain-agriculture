import { Controller, Get } from '@nestjs/common';
import { RuralProducerReponseDto } from '../../dtos/rural-producer.response.dto';
import { GetRuralProducersService } from '../../services/get-rural-producers/get-rural-producers.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('get-rural-producers')
export class GetRuralProducersController {
  constructor(
    private readonly getRuralProducersService: GetRuralProducersService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOkResponse({
    type: RuralProducerReponseDto,
    isArray: true,
  })
  @Get()
  async getAll(): Promise<RuralProducerReponseDto[]> {
    return this.getRuralProducersService.execute();
  }
}
