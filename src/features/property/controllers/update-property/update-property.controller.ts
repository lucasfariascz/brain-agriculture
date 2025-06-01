import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdatePropertyDto } from '../../dtos/update-property.dto';
import { UpdatePropertyService } from '../../services/update-property/update-property.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('update-property')
export class UpdatePropertyController {
  constructor(private readonly updatePropertyService: UpdatePropertyService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @Put(':id')
  async execute(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<void> {
    await this.updatePropertyService.execute(id, updatePropertyDto);
  }
}
