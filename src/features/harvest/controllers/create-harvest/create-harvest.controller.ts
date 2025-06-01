import { Body, Controller, Post } from '@nestjs/common';
import { CreateHarvestDto } from '../../dtos/create-harvest.dto';
import { CreateHarvestService } from '../../services/create-harvest/create-harvest.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('create-harvest')
export class CreateHarvestController {
  constructor(private readonly createHarvestService: CreateHarvestService) {}

  @ApiTags('Harvest - Safra')
  @ApiOperation({
    summary: 'Criar nova safra',
    description: 'Cria uma nova safra com o ano especificado',
  })
  @ApiBody({
    type: CreateHarvestDto,
    description: 'Dados da safra a ser criada',
  })
  @ApiResponse({
    status: 201,
    description: 'Safra criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @Post()
  @LogExecution()
  async create(@Body() createHarvestDto: CreateHarvestDto): Promise<void> {
    await this.createHarvestService.execute(createHarvestDto);
  }
}
