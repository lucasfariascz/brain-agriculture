import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PropertyEntity } from '../../property/entities/property.entity';
import { PlantCropEntity } from '../../plat-crop/entities/plant-crop.entity';
import { RuralProducerEntity } from '../../rural-producer/entities/rural-producer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogExecution } from '../../../shared/config/decorators/log.decorator';

@Injectable()
export class DashboardRepository {
  private logger: Logger;

  constructor(
    @InjectRepository(PropertyEntity)
    private propertyEntity: Repository<PropertyEntity>,
    @InjectRepository(PlantCropEntity)
    private plantCropEntity: Repository<PlantCropEntity>,
    @InjectRepository(RuralProducerEntity)
    private ruralProducerEntity: Repository<RuralProducerEntity>,
  ) {
    this.logger = new Logger(DashboardRepository.name);
  }

  @LogExecution()
  async getTotalFarms(): Promise<number> {
    try {
      return await this.propertyEntity.count();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar total de fazendas',
      );
    }
  }

  @LogExecution()
  async getTotalProducers(): Promise<number> {
    try {
      return await this.ruralProducerEntity.count();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar total de produtores',
      );
    }
  }

  @LogExecution()
  async getTotalAreas(): Promise<{
    totalAreaHectares: number;
    arableAreaHectares: number;
    vegetationAreaHectares: number;
  }> {
    try {
      const result = await this.propertyEntity
        .createQueryBuilder('property')
        .select([
          'SUM(property.totalAreaHectares) as totalAreaHectares',
          'SUM(property.arableAreaHectares) as arableAreaHectares',
          'SUM(property.vegetationAreaHectares) as vegetationAreaHectares',
        ])
        .getRawOne();

      return {
        totalAreaHectares: parseFloat(result.totalareahectares) || 0,
        arableAreaHectares: parseFloat(result.arableareahectares) || 0,
        vegetationAreaHectares: parseFloat(result.vegetationareahectares) || 0,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar totais de área');
    }
  }

  @LogExecution()
  async getFarmsByState(): Promise<
    { farmState: string; farmsCount: number }[]
  > {
    try {
      const result = await this.propertyEntity
        .createQueryBuilder('property')
        .select(['property.farmState as farmState', 'COUNT(*) as farmsCount'])
        .groupBy('property.farmState')
        .getRawMany();

      return result.map((item) => ({
        farmState: item.farmstate,
        farmsCount: parseInt(item.farmscount),
      }));
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar fazendas por estado',
      );
    }
  }

  @LogExecution()
  async getFarmsByCrop(): Promise<{ cropName: string; farmsCount: number }[]> {
    try {
      const result = await this.plantCropEntity
        .createQueryBuilder('plantCrop')
        .select([
          'plantCrop.name as cropName',
          'COUNT(DISTINCT(property.id)) as farmsCount',
        ])
        .innerJoin('plantCrop.property', 'property')
        .groupBy('plantCrop.name')
        .getRawMany();

      return result.map((item) => ({
        cropName: item.cropname,
        farmsCount: parseInt(item.farmscount),
      }));
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar fazendas por cultura',
      );
    }
  }
}
