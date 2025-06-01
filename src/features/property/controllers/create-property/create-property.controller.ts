import { Body, Controller, Post } from '@nestjs/common';
import { CreatePropertyDto } from '../../dtos/create-property.dto';
import { CreatePropertyService } from '../../services/create-property/create-property.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('create-property')
export class CreatePropertyController {
  constructor(private readonly createPropertyService: CreatePropertyService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @Post()
  @LogExecution()
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<void> {
    await this.createPropertyService.execute(createPropertyDto);
  }
}
