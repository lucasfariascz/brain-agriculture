import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { HarvestEntity } from '../entities/harvest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogExecution } from '../../../shared/config/decorators/log.decorator';

@Injectable()
export class HarvestRepository {
  private logger: Logger;

  constructor(
    @InjectRepository(HarvestEntity)
    private harvestEntity: Repository<HarvestEntity>,
  ) {
    this.logger = new Logger(HarvestRepository.name);
  }

  @LogExecution()
  async create(harvestEntity: HarvestEntity): Promise<void> {
    try {
      await this.harvestEntity.save(harvestEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao criar safra');
    }
  }

  @LogExecution()
  async findAll(): Promise<HarvestEntity[]> {
    try {
      return await this.harvestEntity.find({
        relations: ['plantCrops'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar safras');
    }
  }

  @LogExecution()
  async findById(id: string): Promise<HarvestEntity | null> {
    try {
      return await this.harvestEntity.findOne({
        where: { id },
        relations: ['plantCrops'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar safra');
    }
  }

  @LogExecution()
  async update(id: string, harvestEntity: HarvestEntity): Promise<void> {
    try {
      await this.harvestEntity.update(id, harvestEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao atualizar safra');
    }
  }

  @LogExecution()
  async delete(id: string): Promise<void> {
    try {
      await this.harvestEntity.softDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao remover safra');
    }
  }
}
