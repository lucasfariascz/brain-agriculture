import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantCropEntity } from './entities/plant-crop.entity';
import { PlantCropRepository } from './repositories/plant-crop.repository';
import { HarvestRepository } from '../harvest/repositories/harvest.repository';
import { GetPlantCropByIdService } from './services/get-plant-crop-by-id/get-plant-crop-by-id.service';
import { PropertyEntity } from '../property/entities/property.entity';
import { PropertyRepository } from '../property/repositories/property.repository';
import { HarvestEntity } from '../harvest/entities/harvest.entity';
import { GetPlantCropsController } from './controllers/get-plant-crops/get-plant-crops.controller';
import { UpdatePlantCropController } from './controllers/update-plant-crop/update-plant-crop.controller';
import { GetPlantCropsService } from './services/get-plant-crops/get-plant-crops.service';
import { CreatePlantCropController } from './controllers/create-plant-crop/create-plant-crop.controller';
import { DeletePlantCropService } from './services/delete-plant-crop/delete-plant-crop.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UpdatePlantCropService } from './services/update-plant-crop/update-plant-crop.service';
import { DeletePlantCropController } from './controllers/delete-plant-crop/delete-plant-crop.controller';
import { GetPlantCropByIdController } from './controllers/get-plant-crop-by-id/get-plant-crop-by-id.controller';
import { CreatePlantCropService } from './services/create-plant-crop/create-plant-crop.service';

@Module({
  controllers: [
    CreatePlantCropController,
    GetPlantCropsController,
    UpdatePlantCropController,
    DeletePlantCropController,
    GetPlantCropByIdController,
  ],
  providers: [
    PlantCropRepository,
    PropertyRepository,
    HarvestRepository,
    CreatePlantCropService,
    GetPlantCropsService,
    UpdatePlantCropService,
    DeletePlantCropService,
    GetPlantCropByIdService,
  ],
  exports: [PlantCropRepository],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([PlantCropEntity, PropertyEntity, HarvestEntity]),
  ],
})
export class PlantCropModule {}
