import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { PropertyEntity } from '../../src/features/property/entities/property.entity';
import { RuralProducerEntity } from '../../src/features/rural-producer/entities/rural-producer.entity';
import { DashboardByCropController } from '../../src/features/dashboard/controllers/dashboard-by-crop/dashboard-by-crop.controller';
import { PlantCropEntity } from '../../src/features/plat-crop/entities/plant-crop.entity';
import { HarvestEntity } from '../../src/features/harvest/entities/harvest.entity';
import { DashboardSummaryController } from '../../src/features/dashboard/controllers/dashboard-summary/dashboard-summary.controller';
import { DashboardByStateController } from '../../src/features/dashboard/controllers/dashboard-by-state/dashboard-by-state.controller';
import { DashboardFarmsTotalController } from '../../src/features/dashboard/controllers/dashboard-farms-total/dashboard-farms-total.controller';
import { DashboardArableVegetationAreasController } from '../../src/features/dashboard/controllers/dashboard-arable-vegetation-areas/dashboard-arable-vegetation-areas.controller';
import { DatabaseModuleTest } from '../../src/shared/database/database-test.module';
import { DashboardSummaryService } from '../../src/features/dashboard/services/dashboard-summary/dashboard-summary.service';
import { DashboardAreaTotalController } from '../../src/features/dashboard/controllers/dashboard-area-total/dashboard-area-total.controller';
import { DashboardByStateService } from '../../src/features/dashboard/services/dashboard-by-state/dashboard-by-state.service';
import { DashboardByCropService } from '../../src/features/dashboard/services/dashboard-by-crop/dashboard-by-crop.service';
import { RuralProducerRepository } from '../../src/features/rural-producer/repositories/rural-producer.repository';
import { DashboardAreaTotalService } from '../../src/features/dashboard/services/dashboard-area-total/dashboard-area-total.service';
import { PlantCropRepository } from '../../src/features/plat-crop/repositories/plant-crop.repository';
import { DashboardFarmsTotalService } from '../../src/features/dashboard/services/dashboard-farms-total/dashboard-farms-total.service';
import { DashboardArableVegetationAreasService } from '../../src/features/dashboard/services/dashboard-arable-vegetation-areas/dashboard-arable-vegetation-areas.service';
import { DashboardRepository } from '../../src/features/dashboard/repositories/dashboard.repository';
import { PropertyRepository } from '../../src/features/property/repositories/property.repository';
import { HarvestRepository } from '../../src/features/harvest/repositories/harvest.repository';

describe('Dashboard (e2e)', () => {
  let app: INestApplication;

  let propertyRepository: PropertyRepository;
  let ruralProducerRepository: RuralProducerRepository;
  let plantCropRepository: PlantCropRepository;
  let harvestRepository: HarvestRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModuleTest,
        TypeOrmModule.forFeature([
          PropertyEntity,
          RuralProducerEntity,
          PlantCropEntity,
          HarvestEntity,
        ]),
      ],
      controllers: [
        DashboardSummaryController,
        DashboardByStateController,
        DashboardByCropController,
        DashboardAreaTotalController,
        DashboardFarmsTotalController,
        DashboardArableVegetationAreasController,
      ],
      providers: [
        DashboardSummaryService,
        DashboardByStateService,
        DashboardByCropService,
        DashboardAreaTotalService,
        DashboardFarmsTotalService,
        DashboardArableVegetationAreasService,
        DashboardRepository,
        PropertyRepository,
        RuralProducerRepository,
        PlantCropRepository,
        HarvestRepository,
      ],
      exports: [DashboardRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    app.useGlobalPipes(new ValidationPipe());

    propertyRepository =
      moduleFixture.get<PropertyRepository>(PropertyRepository);
    ruralProducerRepository = moduleFixture.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
    plantCropRepository =
      moduleFixture.get<PlantCropRepository>(PlantCropRepository);
    harvestRepository = moduleFixture.get<HarvestRepository>(HarvestRepository);

    await app.init();

    await createTestData();
  });

  const createTestData = async () => {
    // Create test rural producers
    const ruralProducer1 = new RuralProducerEntity();
    ruralProducer1.id = '123e4567-e89b-12d3-a456-426614174001';
    ruralProducer1.name = 'Produtor SP';
    ruralProducer1.cpfOrCnpj = '123.456.789-01';
    await ruralProducerRepository.create(ruralProducer1);

    const ruralProducer2 = new RuralProducerEntity();
    ruralProducer2.id = '123e4567-e89b-12d3-a456-426614174002';
    ruralProducer2.name = 'Produtor RJ';
    ruralProducer2.cpfOrCnpj = '123.456.789-02';
    await ruralProducerRepository.create(ruralProducer2);

    // Create test harvests
    const harvest1 = new HarvestEntity();
    harvest1.id = '123e4567-e89b-12d3-a456-426614174011';
    harvest1.year = 2023;
    harvest1.text = 'Safra';
    await harvestRepository.create(harvest1);

    const harvest2 = new HarvestEntity();
    harvest2.id = '123e4567-e89b-12d3-a456-426614174012';
    harvest2.year = 2024;
    harvest2.text = 'Safra';
    await harvestRepository.create(harvest2);

    // Create test properties
    const property1 = new PropertyEntity();
    property1.id = '123e4567-e89b-12d3-a456-426614174021';
    property1.farmName = 'Fazenda SP 1';
    property1.farmCity = 'São Paulo';
    property1.farmState = 'SP';
    property1.totalAreaHectares = 1000;
    property1.arableAreaHectares = 600;
    property1.vegetationAreaHectares = 400;
    property1.ruralProducer = ruralProducer1;
    await propertyRepository.create(property1);

    const property2 = new PropertyEntity();
    property2.id = '123e4567-e89b-12d3-a456-426614174022';
    property2.farmName = 'Fazenda SP 2';
    property2.farmCity = 'Campinas';
    property2.farmState = 'SP';
    property2.totalAreaHectares = 1500;
    property2.arableAreaHectares = 1000;
    property2.vegetationAreaHectares = 500;
    property2.ruralProducer = ruralProducer1;
    await propertyRepository.create(property2);

    const property3 = new PropertyEntity();
    property3.id = '123e4567-e89b-12d3-a456-426614174023';
    property3.farmName = 'Fazenda RJ 1';
    property3.farmCity = 'Rio de Janeiro';
    property3.farmState = 'RJ';
    property3.totalAreaHectares = 800;
    property3.arableAreaHectares = 500;
    property3.vegetationAreaHectares = 300;
    property3.ruralProducer = ruralProducer2;
    await propertyRepository.create(property3);

    // Create test plant crops
    const plantCrop1 = new PlantCropEntity();
    plantCrop1.id = '123e4567-e89b-12d3-a456-426614174031';
    plantCrop1.name = 'Soja';
    plantCrop1.property = property1;
    plantCrop1.harvest = harvest1;
    await plantCropRepository.create(plantCrop1);

    const plantCrop2 = new PlantCropEntity();
    plantCrop2.id = '123e4567-e89b-12d3-a456-426614174032';
    plantCrop2.name = 'Milho';
    plantCrop2.property = property2;
    plantCrop2.harvest = harvest1;
    await plantCropRepository.create(plantCrop2);

    const plantCrop3 = new PlantCropEntity();
    plantCrop3.id = '123e4567-e89b-12d3-a456-426614174033';
    plantCrop3.name = 'Soja';
    plantCrop3.property = property3;
    plantCrop3.harvest = harvest2;
    await plantCropRepository.create(plantCrop3);

    const plantCrop4 = new PlantCropEntity();
    plantCrop4.id = '123e4567-e89b-12d3-a456-426614174034';
    plantCrop4.name = 'Café';
    plantCrop4.property = property3;
    plantCrop4.harvest = harvest1;
    await plantCropRepository.create(plantCrop4);
  };

  describe('/dashboard-summary (GET)', () => {
    it('should get dashboard summary successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/dashboard-summary')
        .expect(200);

      expect(response.body.totalFarms).toBe(3);
      expect(response.body.totalProducers).toBe(2);
      expect(response.body.totalAreaHectares).toBe(3300);
      expect(response.body.arableAreaHectares).toBe(2100);
      expect(response.body.vegetationAreaHectares).toBe(1200);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/dashboard-by-state (GET)', () => {
    it('should get farms distribution by state successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/dashboard-by-state')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBeGreaterThan(0);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/dashboard-by-crop (GET)', () => {
    it('should get farms distribution by crop successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/dashboard-by-crop')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBeGreaterThan(0);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/dashboard-area-total (GET)', () => {
    it('should get total area information successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/dashboard-area-total')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.totalAreaHectares).toBe(3300);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/dashboard-farms-total (GET)', () => {
    it('should get total farms count successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/dashboard-farms-total')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.totalFarms).toBe(3);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/dashboard-arable-vegetation-areas (GET)', () => {
    it('should get arable and vegetation areas distribution successfully', async () => {
      const response = await request(app.getHttpServer())
        .get('/dashboard-arable-vegetation-areas')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.arableAreaHectares).toBe(2100);
      expect(response.body.vegetationAreaHectares).toBe(1200);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
