import { Body, Controller, Post } from '@nestjs/common';
import { CreateRuralProducerDto } from '../../dtos/create-rural-producer.dto';
import { CreateRuralProducerService } from '../../services/create-rural-producer/create-rural-producer.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('create-rural-producer')
export class CreateRuralProducerController {
  constructor(
    private readonly createRuralProducerService: CreateRuralProducerService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @ApiOperation({
    summary: 'Criar novo produtor rural',
    description: 'Cria um novo produtor rural com CPF ou CNPJ',
  })
  @ApiBody({
    type: CreateRuralProducerDto,
    description: 'Dados do produtor rural a ser criado',
  })
  @ApiResponse({
    status: 201,
    description: 'Produtor rural criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @Post()
  create(
    @Body() createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<void> {
    return this.createRuralProducerService.execute(createRuralProducerDto);
  }
}
