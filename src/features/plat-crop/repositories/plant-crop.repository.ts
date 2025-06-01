import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlantCropEntity } from '../entities/plant-crop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogExecution } from '../../../shared/config/decorators/log.decorator';

@Injectable()
export class PlantCropRepository {
  private logger: Logger;

  constructor(
    @InjectRepository(PlantCropEntity)
    private plantCropEntity: Repository<PlantCropEntity>,
  ) {
    this.logger = new Logger(PlantCropRepository.name);
  }

  @LogExecution()
  async create(plantCropEntity: PlantCropEntity): Promise<void> {
    try {
      await this.plantCropEntity.save(plantCropEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao criar cultura plantada');
    }
  }

  @LogExecution()
  async findAll(): Promise<PlantCropEntity[]> {
    try {
      return await this.plantCropEntity.find({
        relations: ['property', 'harvest'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar culturas plantadas',
      );
    }
  }

  @LogExecution()
  async findById(id: string): Promise<PlantCropEntity | null> {
    try {
      return await this.plantCropEntity.findOne({
        where: { id },
        relations: ['property', 'harvest'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar cultura plantada',
      );
    }
  }

  @LogExecution()
  async update(id: string, plantCropEntity: PlantCropEntity): Promise<void> {
    try {
      await this.plantCropEntity.update(id, plantCropEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao atualizar cultura plantada',
      );
    }
  }

  @LogExecution()
  async delete(id: string): Promise<void> {
    try {
      await this.plantCropEntity.softDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao remover cultura plantada',
      );
    }
  }
}
