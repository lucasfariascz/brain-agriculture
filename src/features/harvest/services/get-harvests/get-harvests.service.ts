import { Injectable } from '@nestjs/common';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { HarvestResponseDto } from '../../dtos/harvest.response.dto';
import { plainToInstance } from 'class-transformer';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class GetHarvestsService {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  @LogExecution()
  async execute(): Promise<HarvestResponseDto[]> {
    const findHarvestsEntity = await this.harvestRepository.findAll();

    return plainToInstance(HarvestResponseDto, findHarvestsEntity, {
      excludeExtraneousValues: true,
    });
  }
}
