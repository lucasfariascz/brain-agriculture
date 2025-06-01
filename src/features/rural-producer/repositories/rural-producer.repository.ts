import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RuralProducerEntity } from '../entities/rural-producer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogExecution } from '../../../shared/config/decorators/log.decorator';

@Injectable()
export class RuralProducerRepository {
  private logger: Logger;

  constructor(
    @InjectRepository(RuralProducerEntity)
    private ruralProducerRepository: Repository<RuralProducerEntity>,
  ) {
    this.logger = new Logger(RuralProducerRepository.name);
  }

  @LogExecution()
  async create(ruralProducerEntity: RuralProducerEntity): Promise<void> {
    try {
      await this.ruralProducerRepository.save(ruralProducerEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao criar produtor rural');
    }
  }

  @LogExecution()
  async findByCpfOrCnpj(
    cpfOrCnpj: string,
  ): Promise<RuralProducerEntity | null> {
    try {
      const findRuralProducer = await this.ruralProducerRepository.findOne({
        where: { cpfOrCnpj },
      });

      return findRuralProducer;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar produtor rural');
    }
  }

  @LogExecution()
  async findById(id: string): Promise<RuralProducerEntity | null> {
    try {
      const findRuralProducer = await this.ruralProducerRepository.findOne({
        where: { id },
        relations: ['properties'],
      });

      return findRuralProducer;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao buscar produtor rural');
    }
  }

  @LogExecution()
  async update(
    id: string,
    ruralProducerEntity: RuralProducerEntity,
  ): Promise<void> {
    try {
      await this.ruralProducerRepository.update(id, ruralProducerEntity);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao atualizar produtor rural',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.ruralProducerRepository.softDelete(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Falha ao deletar produtor rural');
    }
  }

  async findAll(): Promise<RuralProducerEntity[]> {
    try {
      const ruralProducers = await this.ruralProducerRepository.find();
      return ruralProducers;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar produtores rurais',
      );
    }
  }
}
