import { Controller, Get } from '@nestjs/common';
import { HarvestResponseDto } from '../../dtos/harvest.response.dto';
import { GetHarvestsService } from '../../services/get-harvests/get-harvests.service';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-harvests')
export class GetHarvestsController {
  constructor(private readonly getHarvestsService: GetHarvestsService) {}

  @ApiTags('Harvest - Safra')
  @ApiOperation({
    summary: 'Listar todas as safras',
    description: 'Retorna uma lista com todas as safras cadastradas no sistema',
  })
  @ApiOkResponse({
    type: HarvestResponseDto,
    isArray: true,
    description: 'Lista de safras retornada com sucesso',
  })
  @Get()
  @LogExecution()
  async getAll(): Promise<HarvestResponseDto[]> {
    return this.getHarvestsService.execute();
  }
}
