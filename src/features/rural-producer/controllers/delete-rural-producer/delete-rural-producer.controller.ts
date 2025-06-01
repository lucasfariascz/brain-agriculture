import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteRuralProducerService } from '../../services/delete-rural-producer/delete-rural-producer.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('delete-rural-producer')
export class DeleteRuralProducerController {
  constructor(
    private readonly deleteRuralProducerService: DeleteRuralProducerService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOperation({
    summary: 'Remover produtor rural',
    description: 'Remove um produtor rural existente do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor rural a ser removido',
    example: '59af6bba-dc6a-4fcc-9673-45b40b7be51c',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor rural removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Produtor rural não encontrado',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteRuralProducerService.execute(id);
  }
}
