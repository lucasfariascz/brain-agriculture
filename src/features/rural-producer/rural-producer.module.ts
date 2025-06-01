import { Module } from '@nestjs/common';
import { CreateRuralProducerController } from './controllers/create-rural-producer/create-rural-producer.controller';
import { RuralProducerRepository } from './repositories/rural-producer.repository';
import { CreateRuralProducerService } from './services/create-rural-producer/create-rural-producer.service';
import { DatabaseModule } from '../../shared/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducerEntity } from './entities/rural-producer.entity';
import { UpdateRuralProducerService } from './services/update-rural-producer/update-rural-producer.service';
import { UpdateRuralProducerController } from './controllers/update-rural-producer/update-rural-producer.controller';
import { DeleteRuralProducerController } from './controllers/delete-rural-producer/delete-rural-producer.controller';
import { DeleteRuralProducerService } from './services/delete-rural-producer/delete-rural-producer.service';
import { GetRuralProducersController } from './controllers/get-rural-producers/get-rural-producers.controller';
import { GetRuralProducersService } from './services/get-rural-producers/get-rural-producers.service';
import { GetRuralProducerByIdController } from './controllers/get-rural-producer-by-id/get-rural-producer-by-id.controller';
import { GetRuralProducerByIdService } from './services/get-rural-producer-by-id/get-rural-producer-by-id.service';
import { GetRuralProducerWithPropertyByIdController } from './controllers/get-rural-producer-with-property-by-id/get-rural-producer-with-property-by-id.controller';
import { GetRuralProducerWithPropertyByIdService } from './services/get-rural-producer-with-property-by-id/get-rural-producer-with-property-by-id.service';

@Module({
  controllers: [
    CreateRuralProducerController,
    UpdateRuralProducerController,
    DeleteRuralProducerController,
    GetRuralProducersController,
    GetRuralProducerByIdController,
    GetRuralProducerWithPropertyByIdController,
  ],
  providers: [
    CreateRuralProducerService,
    UpdateRuralProducerService,
    DeleteRuralProducerService,
    GetRuralProducersService,
    GetRuralProducerByIdService,
    RuralProducerRepository,
    GetRuralProducerWithPropertyByIdService,
  ],
  exports: [RuralProducerRepository],
  imports: [DatabaseModule, TypeOrmModule.forFeature([RuralProducerEntity])],
})
export class RuralProducerModule {}
