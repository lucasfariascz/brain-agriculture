import { Controller, Get, Param } from '@nestjs/common';
import { PropertyResponseDto } from '../../dtos/property.response.dto';
import { GetPropertyByIdService } from '../../services/get-property-by-id/get-property-by-id.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('get-property-by-id')
export class GetPropertyByIdController {
  constructor(
    private readonly getPropertyByIdService: GetPropertyByIdService,
  ) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOkResponse({
    type: PropertyResponseDto,
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<PropertyResponseDto> {
    return this.getPropertyByIdService.execute(id);
  }
}
