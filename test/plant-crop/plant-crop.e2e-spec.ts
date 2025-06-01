import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreatePlantCropDto } from '../../src/features/plat-crop/dtos/create-plant-crop.dto';
import { UpdatePlantCropDto } from '../../src/features/plat-crop/dtos/update-plant-crop.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { PlantCropEntity } from '../../src/features/plat-crop/entities/plant-crop.entity';
import { PropertyEntity } from '../../src/features/property/entities/property.entity';
import { HarvestEntity } from '../../src/features/harvest/entities/harvest.entity';
import { RuralProducerEntity } from '../../src/features/rural-producer/entities/rural-producer.entity';
import { CreatePlantCropController } from '../../src/features/plat-crop/controllers/create-plant-crop/create-plant-crop.controller';
import { CreatePlantCropService } from '../../src/features/plat-crop/services/create-plant-crop/create-plant-crop.service';
import { PlantCropRepository } from '../../src/features/plat-crop/repositories/plant-crop.repository';
import { PropertyRepository } from '../../src/features/property/repositories/property.repository';
import { HarvestRepository } from '../../src/features/harvest/repositories/harvest.repository';
import { RuralProducerRepository } from '../../src/features/rural-producer/repositories/rural-producer.repository';
import { DatabaseModuleTest } from '../../src/shared/database/database-test.module';
import { UpdatePlantCropController } from '../../src/features/plat-crop/controllers/update-plant-crop/update-plant-crop.controller';
import { UpdatePlantCropService } from '../../src/features/plat-crop/services/update-plant-crop/update-plant-crop.service';
import { DeletePlantCropController } from '../../src/features/plat-crop/controllers/delete-plant-crop/delete-plant-crop.controller';
import { DeletePlantCropService } from '../../src/features/plat-crop/services/delete-plant-crop/delete-plant-crop.service';
import { GetPlantCropsService } from '../../src/features/plat-crop/services/get-plant-crops/get-plant-crops.service';
import { GetPlantCropsController } from '../../src/features/plat-crop/controllers/get-plant-crops/get-plant-crops.controller';
import { GetPlantCropByIdController } from '../../src/features/plat-crop/controllers/get-plant-crop-by-id/get-plant-crop-by-id.controller';
import { GetPlantCropByIdService } from '../../src/features/plat-crop/services/get-plant-crop-by-id/get-plant-crop-by-id.service';

describe('PlantCrop (e2e)', () => {
  let app: INestApplication;
  let plantCropRepository: PlantCropRepository;
  let propertyRepository: PropertyRepository;
  let harvestRepository: HarvestRepository;
  let ruralProducerRepository: RuralProducerRepository;

  let testPropertyId: string;
  let testHarvestId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModuleTest,
        TypeOrmModule.forFeature([
          PlantCropEntity,
          PropertyEntity,
          HarvestEntity,
          RuralProducerEntity,
        ]),
      ],
      controllers: [
        CreatePlantCropController,
        UpdatePlantCropController,
        DeletePlantCropController,
        GetPlantCropsController,
        GetPlantCropByIdController,
      ],
      providers: [
        CreatePlantCropService,
        UpdatePlantCropService,
        DeletePlantCropService,
        GetPlantCropsService,
        GetPlantCropByIdService,
        PlantCropRepository,
        PropertyRepository,
        HarvestRepository,
        RuralProducerRepository,
      ],
      exports: [PlantCropRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    app.useGlobalPipes(new ValidationPipe());

    plantCropRepository =
      moduleFixture.get<PlantCropRepository>(PlantCropRepository);
    propertyRepository =
      moduleFixture.get<PropertyRepository>(PropertyRepository);
    harvestRepository = moduleFixture.get<HarvestRepository>(HarvestRepository);
    ruralProducerRepository = moduleFixture.get<RuralProducerRepository>(
      RuralProducerRepository,
    );

    await app.init();

    await createTestDependencies();
  });

  const createTestDependencies = async () => {
    // Create a test rural producer
    const ruralProducer = new RuralProducerEntity();
    ruralProducer.id = '123e4567-e89b-12d3-a456-426614174001';
    ruralProducer.name = 'Test Producer';
    ruralProducer.cpfOrCnpj = '123.456.789-00';
    await ruralProducerRepository.create(ruralProducer);

    // Create a test property
    const property = new PropertyEntity();
    property.id = '123e4567-e89b-12d3-a456-426614174002';
    property.farmName = 'Test Farm';
    property.farmCity = 'Test City';
    property.farmState = 'Test State';
    property.totalAreaHectares = 100;
    property.arableAreaHectares = 80;
    property.vegetationAreaHectares = 20;
    property.ruralProducer = ruralProducer;
    await propertyRepository.create(property);
    testPropertyId = property.id;

    // Create a test harvest
    const harvest = new HarvestEntity();
    harvest.id = '123e4567-e89b-12d3-a456-426614174003';
    harvest.year = 2023;
    harvest.text = 'Safra';
    await harvestRepository.create(harvest);
    testHarvestId = harvest.id;
  };

  describe('/create-plant-crop (POST)', () => {
    it('should create a plant crop successfully', async () => {
      const createPlantCropDto: CreatePlantCropDto = {
        name: 'Soja',
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      const response = await request(app.getHttpServer())
        .post('/create-plant-crop')
        .send(createPlantCropDto)
        .expect(201);

      expect(response).toBeDefined();
    });

    it('should not create a plant crop without name', async () => {
      const createPlantCropDto = {
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      const response = await request(app.getHttpServer())
        .post('/create-plant-crop')
        .send(createPlantCropDto)
        .expect(400);

      expect(response.body.message).toContain('Nome da cultura não informado.');
    });

    it('should not create a plant crop without harvestId', async () => {
      const createPlantCropDto = {
        name: 'Soja',
        propertyId: testPropertyId,
      };

      const response = await request(app.getHttpServer())
        .post('/create-plant-crop')
        .send(createPlantCropDto)
        .expect(400);

      expect(response.body.message).toContain('ID da safra não informado.');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/update-plant-crop/:id (PUT)', () => {
    it('should update a plant crop successfully', async () => {
      const createPlantCropDto: CreatePlantCropDto = {
        name: 'Milho',
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      await request(app.getHttpServer())
        .post('/create-plant-crop')
        .send(createPlantCropDto)
        .expect(201);

      const allPlantCrops = await plantCropRepository.findAll();
      const plantCrop = allPlantCrops.find(
        (allPlantCrop) => allPlantCrop.name === createPlantCropDto.name,
      );

      const updatePlantCropDto: UpdatePlantCropDto = {
        name: 'Soja Atualizada',
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      const response = await request(app.getHttpServer())
        .put(`/update-plant-crop/${plantCrop.id}`)
        .send(updatePlantCropDto)
        .expect(200);

      expect(response).toBeDefined();

      const updatedPlantCrop = await plantCropRepository.findById(plantCrop.id);
      expect(updatedPlantCrop.name).toBe(updatePlantCropDto.name);
    });

    it('should not update a non-existent plant crop', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const updatePlantCropDto: UpdatePlantCropDto = {
        name: 'Soja Atualizada',
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      const response = await request(app.getHttpServer())
        .put(`/update-plant-crop/${nonExistentId}`)
        .send(updatePlantCropDto)
        .expect(404);

      expect(response.body.message).toBe('Cultura plantada não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/delete-plant-crop/:id (DELETE)', () => {
    it('should delete a plant crop successfully', async () => {
      const createPlantCropDto: CreatePlantCropDto = {
        name: 'Milho',
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      await request(app.getHttpServer())
        .post('/create-plant-crop')
        .send(createPlantCropDto)
        .expect(201);

      const allPlantCrops = await plantCropRepository.findAll();
      const plantCrop = allPlantCrops.find(
        (allPlantCrop) => allPlantCrop.name === createPlantCropDto.name,
      );

      const response = await request(app.getHttpServer())
        .delete(`/delete-plant-crop/${plantCrop.id}`)
        .expect(200);

      expect(response).toBeDefined();

      const deletedPlantCrop = await plantCropRepository.findById(plantCrop.id);
      expect(deletedPlantCrop).toBeNull();
    });

    it('should not delete a non-existent plant crop', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .delete(`/delete-plant-crop/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Cultura plantada não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/get-plant-crops (GET)', () => {
    it('should get all plant crops successfully', async () => {
      const plantCrops = [
        {
          name: 'Soja',
          propertyId: testPropertyId,
          harvestId: testHarvestId,
        },
        {
          name: 'Milho',
          propertyId: testPropertyId,
          harvestId: testHarvestId,
        },
        {
          name: 'Café',
          propertyId: testPropertyId,
          harvestId: testHarvestId,
        },
      ];

      for (const plantCrop of plantCrops) {
        await request(app.getHttpServer())
          .post('/create-plant-crop')
          .send(plantCrop)
          .expect(201);
      }

      const response = await request(app.getHttpServer())
        .get('/get-plant-crops')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(3);

      expect(response.body[0].name).toEqual(plantCrops[0].name);
      expect(response.body[1].name).toEqual(plantCrops[1].name);
      expect(response.body[2].name).toEqual(plantCrops[2].name);
    });

    it('should return empty array when no plant crops exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/get-plant-crops')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(0);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/get-plant-crop-by-id/:id (GET)', () => {
    it('should get a plant crop by id successfully', async () => {
      const createPlantCropDto: CreatePlantCropDto = {
        name: 'Soja Individual',
        propertyId: testPropertyId,
        harvestId: testHarvestId,
      };

      await request(app.getHttpServer())
        .post('/create-plant-crop')
        .send(createPlantCropDto)
        .expect(201);

      const allPlantCrops = await plantCropRepository.findAll();
      const plantCrop = allPlantCrops.find(
        (allPlantCrop) => allPlantCrop.name === createPlantCropDto.name,
      );

      const response = await request(app.getHttpServer())
        .get(`/get-plant-crop-by-id/${plantCrop.id}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(plantCrop.id);
      expect(response.body.name).toBe(createPlantCropDto.name);
    });

    it('should not get a non-existent plant crop', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .get(`/get-plant-crop-by-id/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Cultura plantada não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
