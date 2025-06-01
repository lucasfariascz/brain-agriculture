import { Body, Controller, Post } from '@nestjs/common';
import { CreateHarvestDto } from '../../dtos/create-harvest.dto';
import { CreateHarvestService } from '../../services/create-harvest/create-harvest.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('create-harvest')
export class CreateHarvestController {
  constructor(private readonly createHarvestService: CreateHarvestService) {}

  @ApiTags('Harvest - Safra')
  @Post()
  @LogExecution()
  async create(@Body() createHarvestDto: CreateHarvestDto): Promise<void> {
    await this.createHarvestService.execute(createHarvestDto);
  }
}
