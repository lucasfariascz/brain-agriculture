import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PropertyEntity } from '../entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogExecution } from '../../../shared/config/decorators/log.decorator';

@Injectable()
export class PropertyRepository {
  private logger: Logger;

  constructor(
    @InjectRepository(PropertyEntity)
    private propertyEntity: Repository<PropertyEntity>,
  ) {
    this.logger = new Logger(PropertyRepository.name);
  }

  @LogExecution()
  async create(propertyEntity: PropertyEntity): Promise<void> {
    try {
      await this.propertyEntity.save(propertyEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao criar propriedade');
    }
  }

  @LogExecution()
  async findAll(): Promise<PropertyEntity[]> {
    try {
      return await this.propertyEntity.find({
        relations: ['ruralProducer', 'plantCrops'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar propriedades');
    }
  }

  @LogExecution()
  async findById(id: string): Promise<PropertyEntity | null> {
    try {
      return await this.propertyEntity.findOne({
        where: { id },
        relations: ['ruralProducer', 'plantCrops'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar propriedade');
    }
  }

  @LogExecution()
  async update(id: string, propertyEntity: PropertyEntity): Promise<void> {
    try {
      await this.propertyEntity.update(id, propertyEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao atualizar propriedade');
    }
  }

  @LogExecution()
  async delete(id: string): Promise<void> {
    try {
      await this.propertyEntity.softDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao remover propriedade');
    }
  }
}
