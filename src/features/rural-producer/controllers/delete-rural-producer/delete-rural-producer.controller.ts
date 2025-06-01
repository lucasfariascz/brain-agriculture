import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteRuralProducerService } from '../../services/delete-rural-producer/delete-rural-producer.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('delete-rural-producer')
export class DeleteRuralProducerController {
  constructor(
    private readonly deleteRuralProducerService: DeleteRuralProducerService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteRuralProducerService.execute(id);
  }
}
