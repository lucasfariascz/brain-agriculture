import { Body, Controller, Post } from '@nestjs/common';
import { CreateRuralProducerDto } from '../../dtos/create-rural-producer.dto';
import { CreateRuralProducerService } from '../../services/create-rural-producer/create-rural-producer.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('create-rural-producer')
export class CreateRuralProducerController {
  constructor(
    private readonly createRuralProducerService: CreateRuralProducerService,
  ) {}

  @ApiTags('Rural Producer - Produtores Rurais')
  @Post()
  create(
    @Body() createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<void> {
    return this.createRuralProducerService.execute(createRuralProducerDto);
  }
}
