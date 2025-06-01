import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePropertyService } from '../../services/delete-property/delete-property.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('delete-property')
export class DeletePropertyController {
  constructor(private readonly deletePropertyService: DeletePropertyService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOperation({
    summary: 'Remover propriedade',
    description: 'Remove uma propriedade agrícola existente do sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da propriedade a ser removida',
    example: 'c1e55996-1d6f-492a-83a6-b65434d9712a',
  })
  @ApiResponse({
    status: 200,
    description: 'Propriedade removida com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Propriedade não encontrada',
  })
  @Delete(':id')
  async execute(@Param('id') id: string): Promise<void> {
    await this.deletePropertyService.execute(id);
  }
}
