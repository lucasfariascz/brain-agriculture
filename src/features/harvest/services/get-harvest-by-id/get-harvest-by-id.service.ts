import { Injectable, NotFoundException } from '@nestjs/common';
import { HarvestRepository } from '../../repositories/harvest.repository';
import { HarvestResponseDto } from '../../dtos/harvest.response.dto';
import { plainToInstance } from 'class-transformer';
import { LogExecution } from '../../../../shared/config/decorators/log.decorator';

@Injectable()
export class GetHarvestByIdService {
  constructor(private readonly harvestRepository: HarvestRepository) {}

  @LogExecution()
  async execute(id: string): Promise<HarvestResponseDto> {
    const findHarvestEntity = await this.harvestRepository.findById(id);

    if (!findHarvestEntity) {
      throw new NotFoundException('Safra não encontrada');
    }

    return plainToInstance(HarvestResponseDto, findHarvestEntity, {
      excludeExtraneousValues: true,
    });
  }
}
