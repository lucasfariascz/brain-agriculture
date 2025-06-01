import { Controller, Get, Param } from '@nestjs/common';
import { GetRuralProducerByIdService } from '../../services/get-rural-producer-by-id/get-rural-producer-by-id.service';
import { RuralProducerReponseDto } from '../../dtos/rural-producer.response.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('get-rural-producer-by-id')
export class GetRuralProducerByIdController {
  constructor(
    private readonly getRuralProducerByIdService: GetRuralProducerByIdService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOkResponse({
    type: RuralProducerReponseDto,
  })
  @Get(':id')
  async getRuralProducerById(
    @Param('id') id: string,
  ): Promise<RuralProducerReponseDto> {
    return await this.getRuralProducerByIdService.execute(id);
  }
}
