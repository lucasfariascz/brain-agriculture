import { Controller, Get, Param } from '@nestjs/common';
import { RuralProducerWithPropertyResponseDto } from '../../dtos/rural-producer-with-property.response.dto';
import { GetRuralProducerWithPropertyByIdService } from '../../services/get-rural-producer-with-property-by-id/get-rural-producer-with-property-by-id.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('get-rural-producer-with-property-by-id')
export class GetRuralProducerWithPropertyByIdController {
  constructor(
    private readonly getRuralProducerWithPropertyByIdService: GetRuralProducerWithPropertyByIdService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOkResponse({
    type: RuralProducerWithPropertyResponseDto,
  })
  @Get('/:id/property')
  async getRuralProducerWithPropertyById(
    @Param('id') id: string,
  ): Promise<RuralProducerWithPropertyResponseDto> {
    return this.getRuralProducerWithPropertyByIdService.execute(id);
  }
}
