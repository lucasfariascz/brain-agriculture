import { Body, Controller, Post } from '@nestjs/common';
import { CreatePropertyDto } from '../../dtos/create-property.dto';
import { CreatePropertyService } from '../../services/create-property/create-property.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('create-property')
export class CreatePropertyController {
  constructor(private readonly createPropertyService: CreatePropertyService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOperation({
    summary: 'Criar nova propriedade',
    description:
      'Cria uma nova propriedade agrícola vinculada a um produtor rural',
  })
  @ApiBody({
    type: CreatePropertyDto,
    description: 'Dados da propriedade a ser criada',
  })
  @ApiResponse({
    status: 201,
    description: 'Propriedade criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou erro de validação',
  })
  @Post()
  @LogExecution()
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<void> {
    await this.createPropertyService.execute(createPropertyDto);
  }
}
