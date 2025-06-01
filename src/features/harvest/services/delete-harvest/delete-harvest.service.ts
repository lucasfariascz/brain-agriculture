import { Injectable, NotFoundException } from '@nestjs/common';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class DeleteHarvestService {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  @LogExecution()
  async execute(id: string): Promise<void> {
    const existingHarvest = await this.harvestRepository.findById(id);

    if (!existingHarvest) {
      throw new NotFoundException('Safra não encontrada');
    }

    await this.harvestRepository.delete(id);
  }
}
