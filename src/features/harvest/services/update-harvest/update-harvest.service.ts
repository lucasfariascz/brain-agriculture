import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateHarvestDto } from '../../dtos/update-harvest.dto';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { HarvestEntity } from '../../entities/harvest.entity';
import { isNotNullOrUndefined } from '../../../../shared/config/utils/string-transformations';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class UpdateHarvestService {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  @LogExecution()
  async execute(id: string, updateHarvestDto: UpdateHarvestDto): Promise<void> {
    const findHarvestEntity = await this.harvestRepository.findById(id);

    if (!isNotNullOrUndefined(findHarvestEntity)) {
      throw new NotFoundException('Safra não encontrada');
    }

    const harvestEntity = new HarvestEntity();
    harvestEntity.year = updateHarvestDto.year;

    await this.harvestRepository.update(id, harvestEntity);
  }
}
