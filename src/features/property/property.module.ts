import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './entities/property.entity';
import { PropertyRepository } from './repositories/property.repository';
import { CreatePropertyController } from './controllers/create-property/create-property.controller';
import { GetPropertiesController } from './controllers/get-properties/get-properties.controller';
import { UpdatePropertyController } from './controllers/update-property/update-property.controller';
import { DeletePropertyController } from './controllers/delete-property/delete-property.controller';
import { GetPropertyByIdController } from './controllers/get-property-by-id/get-property-by-id.controller';
import { GetPropertyWithPlantCropByIdController } from './controllers/get-property-with-plant-crop-by-id/get-property-with-plant-crop-by-id.controller';
import { CreatePropertyService } from './services/create-property/create-property.service';
import { GetPropertiesService } from './services/get-properties/get-properties.service';
import { UpdatePropertyService } from './services/update-property/update-property.service';
import { DeletePropertyService } from './services/delete-property/delete-property.service';
import { GetPropertyByIdService } from './services/get-property-by-id/get-property-by-id.service';
import { GetPropertyWithPlantCropByIdService } from './services/get-property-with-plant-crop-by-id/get-property-with-plant-crop-by-id.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { RuralProducerRepository } from '../rural-producer/repositories/rural-producer.repository';
import { RuralProducerEntity } from '../rural-producer/entities/rural-producer.entity';
import { AddPlantCropsToPropertyCropController } from './controllers/add-plant-crops-to-property/add-plant-crops-to-property.controller';
import { AddPlantCropsToPropertyService } from './services/add-plant-crops-to-property/add-plant-crops-to-property.service';
import { PlantCropEntity } from '../plat-crop/entities/plant-crop.entity';
import { HarvestEntity } from '../harvest/entities/harvest.entity';
import { PlantCropRepository } from '../plat-crop/repositories/plant-crop.repository';
import { HarvestRepository } from '../harvest/repositories/harvest.repository';

@Module({
  controllers: [
    CreatePropertyController,
    GetPropertiesController,
    UpdatePropertyController,
    DeletePropertyController,
    GetPropertyByIdController,
    GetPropertyWithPlantCropByIdController,
    AddPlantCropsToPropertyCropController,
  ],
  providers: [
    PropertyRepository,
    RuralProducerRepository,
    PlantCropRepository,
    HarvestRepository,
    CreatePropertyService,
    GetPropertiesService,
    UpdatePropertyService,
    DeletePropertyService,
    GetPropertyByIdService,
    GetPropertyWithPlantCropByIdService,
    AddPlantCropsToPropertyService,
  ],
  exports: [PropertyRepository],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PropertyEntity,
      RuralProducerEntity,
      PlantCropEntity,
      HarvestEntity,
    ]),
  ],
})
export class PropertyModule {}
