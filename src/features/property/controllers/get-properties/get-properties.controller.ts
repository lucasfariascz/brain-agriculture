import { Controller, Get } from '@nestjs/common';
import { GetPropertiesService } from '../../services/get-properties/get-properties.service';
import { PropertyResponseDto } from '../../dtos/property.response.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Controller('get-properties')
export class GetPropertiesController {
  constructor(private readonly getPropertiesService: GetPropertiesService) {}

  @ApiTags('Property - Propriedades Agrícolas')
  @ApiOkResponse({
    type: PropertyResponseDto,
    isArray: true,
  })
  @Get()
  @LogExecution()
  async execute(): Promise<PropertyResponseDto[]> {
    return await this.getPropertiesService.execute();
  }
}
