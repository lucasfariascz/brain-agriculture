import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateHarvestDto } from '../../dtos/update-harvest.dto';
import { UpdateHarvestService } from '../../services/update-harvest/update-harvest.service';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('update-harvest')
export class UpdateHarvestController {
  constructor(private readonly updateHarvestService: UpdateHarvestService) {}

  @ApiTags('Harvest - Safra')
  @ApiOperation({
    summary: 'Atualizar safra',
    description: 'Atualiza os dados de uma safra existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da safra a ser atualizada',
    example: 'be89a300-80d3-40c0-8a59-8fb6501a9838',
  })
  @ApiBody({
    type: UpdateHarvestDto,
    description: 'Dados atualizados da safra',
  })
  @ApiResponse({
    status: 200,
    description: 'Safra atualizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @ApiResponse({
    status: 404,
    description: 'Safra não encontrada',
  })
  @Put(':id')
  @LogExecution()
  async update(
    @Param('id') id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ): Promise<void> {
    await this.updateHarvestService.execute(id, updateHarvestDto);
  }
}
