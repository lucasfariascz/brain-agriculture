import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateRuralProducerService } from '../../services/update-rural-producer/update-rural-producer.service';
import { UpdateRuralProducerDto } from '../../dtos/update-rural-producer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('update-rural-producer')
export class UpdateRuralProducerController {
  constructor(
    private readonly updateRuralProducerService: UpdateRuralProducerService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<void> {
    return this.updateRuralProducerService.execute(id, updateRuralProducerDto);
  }
}
