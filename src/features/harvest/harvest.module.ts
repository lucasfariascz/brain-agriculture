import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestEntity } from './entities/harvest.entity';
import { CreateHarvestController } from './controllers/create-harvest/create-harvest.controller';
import { CreateHarvestService } from './services/create-harvest/create-harvest.service';
import { HarvestRepository } from './repositories/harvest.repository';
import { GetHarvestsController } from './controllers/get-harvests/get-harvests.controller';
import { GetHarvestsService } from './services/get-harvests/get-harvests.service';
import { GetHarvestByIdController } from './controllers/get-harvest-by-id/get-harvest-by-id.controller';
import { GetHarvestByIdService } from './services/get-harvest-by-id/get-harvest-by-id.service';
import { DatabaseModule } from '../../shared/database/database.module';
import { UpdateHarvestController } from './controllers/update-harvest/update-harvest.controller';
import { UpdateHarvestService } from './services/update-harvest/update-harvest.service';
import { DeleteHarvestController } from './controllers/delete-harvest/delete-harvest.controller';
import { DeleteHarvestService } from './services/delete-harvest/delete-harvest.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([HarvestEntity])],
  providers: [
    CreateHarvestService,
    GetHarvestsService,
    GetHarvestByIdService,
    UpdateHarvestService,
    DeleteHarvestService,
    HarvestRepository,
  ],
  controllers: [
    CreateHarvestController,
    GetHarvestsController,
    GetHarvestByIdController,
    UpdateHarvestController,
    DeleteHarvestController,
  ],
  exports: [HarvestRepository],
})
export class HarvestModule {}
