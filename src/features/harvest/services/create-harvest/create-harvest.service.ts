import { Injectable } from '@nestjs/common';
import { CreateHarvestDto } from '../../dtos/create-harvest.dto';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { HarvestEntity } from '../../entities/harvest.entity';
import { v4 as uuidv4 } from 'uuid';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class CreateHarvestService {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  @LogExecution()
  async execute(createHarvestDto: CreateHarvestDto): Promise<void> {
    const harvestEntity = new HarvestEntity();
    harvestEntity.id = uuidv4();
    harvestEntity.year = createHarvestDto.year;

    await this.harvestRepository.create(harvestEntity);
  }
}
