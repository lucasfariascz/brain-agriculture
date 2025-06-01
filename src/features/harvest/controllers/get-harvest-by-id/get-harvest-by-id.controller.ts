import { Controller, Get, Param } from '@nestjs/common';
import { HarvestResponseDto } from '../../dtos/harvest.response.dto';
import { GetHarvestByIdService } from '../../services/get-harvest-by-id/get-harvest-by-id.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-harvest-by-id')
export class GetHarvestByIdController {
  constructor(private readonly getHarvestByIdService: GetHarvestByIdService) {}

  @ApiTags('Harvest - Safra')
  @ApiOperation({
    summary: 'Buscar safra por ID',
    description: 'Retorna os dados de uma safra específica pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da safra a ser buscada',
    example: 'be89a300-80d3-40c0-8a59-8fb6501a9838',
  })
  @ApiOkResponse({
    type: HarvestResponseDto,
    description: 'Safra encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Safra não encontrada',
  })
  @Get(':id')
  @LogExecution()
  async getById(@Param('id') id: string): Promise<HarvestResponseDto> {
    return this.getHarvestByIdService.execute(id);
  }
}
