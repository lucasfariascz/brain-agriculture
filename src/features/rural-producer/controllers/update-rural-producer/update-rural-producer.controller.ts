import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateRuralProducerService } from '../../services/update-rural-producer/update-rural-producer.service';
import { UpdateRuralProducerDto } from '../../dtos/update-rural-producer.dto';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('update-rural-producer')
export class UpdateRuralProducerController {
  constructor(
    private readonly updateRuralProducerService: UpdateRuralProducerService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOperation({
    summary: 'Atualizar produtor rural',
    description: 'Atualiza os dados de um produtor rural existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do produtor rural a ser atualizado',
    example: '59af6bba-dc6a-4fcc-9673-45b40b7be51c',
  })
  @ApiBody({
    type: UpdateRuralProducerDto,
    description: 'Dados atualizados do produtor rural',
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor rural atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @ApiResponse({
    status: 404,
    description: 'Produtor rural não encontrado',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<void> {
    return this.updateRuralProducerService.execute(id, updateRuralProducerDto);
  }
}
