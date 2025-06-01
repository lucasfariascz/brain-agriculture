import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePropertyService } from '../../services/delete-property/delete-property.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('delete-property')
export class DeletePropertyController {
  constructor(private readonly deletePropertyService: DeletePropertyService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @Delete(':id')
  async execute(@Param('id') id: string): Promise<void> {
    await this.deletePropertyService.execute(id);
  }
}
