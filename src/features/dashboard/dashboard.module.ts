import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantCropEntity } from '../plat-crop/entities/plant-crop.entity';
import { DatabaseModule } from 'src/shared/database/database.module';
import { DashboardByCropController } from './controllers/dashboard-by-crop/dashboard-by-crop.controller';
import { DashboardSummaryController } from './controllers/dashboard-summary/dashboard-summary.controller';
import { RuralProducerEntity } from '../rural-producer/entities/rural-producer.entity';
import { DashboardRepository } from './repositories/dashboard.repository';
import { DashboardFarmsTotalController } from './controllers/dashboard-farms-total/dashboard-farms-total.controller';
import { PropertyEntity } from '../property/entities/property.entity';
import { DashboardArableVegetationAreasController } from './controllers/dashboard-arable-vegetation-areas/dashboard-arable-vegetation-areas.controller';
import { DashboardFarmsTotalService } from './services/dashboard-farms-total/dashboard-farms-total.service';
import { DashboardAreaTotalController } from './controllers/dashboard-area-total/dashboard-area-total.controller';
import { DashboardByStateController } from './controllers/dashboard-by-state/dashboard-by-state.controller';
import { DashboardArableVegetationAreasService } from './services/dashboard-arable-vegetation-areas/dashboard-arable-vegetation-areas.service';
import { DashboardSummaryService } from './services/dashboard-summary/dashboard-summary.service';
import { DashboardAreaTotalService } from './services/dashboard-area-total/dashboard-area-total.service';
import { DashboardByCropService } from './services/dashboard-by-crop/dashboard-by-crop.service';
import { DashboardByStateService } from './services/dashboard-by-state/dashboard-by-state.service';

@Module({
  controllers: [
    DashboardSummaryController,
    DashboardFarmsTotalController,
    DashboardAreaTotalController,
    DashboardByCropController,
    DashboardByStateController,
    DashboardArableVegetationAreasController,
  ],
  providers: [
    DashboardRepository,
    DashboardSummaryService,
    DashboardFarmsTotalService,
    DashboardAreaTotalService,
    DashboardByCropService,
    DashboardByStateService,
    DashboardArableVegetationAreasService,
  ],
  exports: [DashboardRepository],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      PropertyEntity,
      PlantCropEntity,
      RuralProducerEntity,
    ]),
  ],
})
export class DashboardModule {}
