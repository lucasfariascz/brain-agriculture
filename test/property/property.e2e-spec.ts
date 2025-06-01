import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreatePropertyDto } from '../../src/features/property/dtos/create-property.dto';
import { UpdatePropertyDto } from '../../src/features/property/dtos/update-property.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { PropertyEntity } from '../../src/features/property/entities/property.entity';
import { RuralProducerEntity } from '../../src/features/rural-producer/entities/rural-producer.entity';
import { CreatePropertyController } from '../../src/features/property/controllers/create-property/create-property.controller';
import { CreatePropertyService } from '../../src/features/property/services/create-property/create-property.service';
import { PropertyRepository } from '../../src/features/property/repositories/property.repository';
import { RuralProducerRepository } from '../../src/features/rural-producer/repositories/rural-producer.repository';
import { DatabaseModuleTest } from '../../src/shared/database/database-test.module';
import { UpdatePropertyController } from '../../src/features/property/controllers/update-property/update-property.controller';
import { UpdatePropertyService } from '../../src/features/property/services/update-property/update-property.service';
import { DeletePropertyController } from '../../src/features/property/controllers/delete-property/delete-property.controller';
import { DeletePropertyService } from '../../src/features/property/services/delete-property/delete-property.service';
import { GetPropertiesService } from '../../src/features/property/services/get-properties/get-properties.service';
import { GetPropertiesController } from '../../src/features/property/controllers/get-properties/get-properties.controller';
import { GetPropertyByIdController } from '../../src/features/property/controllers/get-property-by-id/get-property-by-id.controller';
import { GetPropertyByIdService } from '../../src/features/property/services/get-property-by-id/get-property-by-id.service';

describe('Property (e2e)', () => {
  let app: INestApplication;
  let propertyRepository: PropertyRepository;
  let ruralProducerRepository: RuralProducerRepository;

  let testRuralProducerId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModuleTest,
        TypeOrmModule.forFeature([PropertyEntity, RuralProducerEntity]),
      ],
      controllers: [
        CreatePropertyController,
        UpdatePropertyController,
        DeletePropertyController,
        GetPropertiesController,
        GetPropertyByIdController,
      ],
      providers: [
        CreatePropertyService,
        UpdatePropertyService,
        DeletePropertyService,
        GetPropertiesService,
        GetPropertyByIdService,
        PropertyRepository,
        RuralProducerRepository,
      ],
      exports: [PropertyRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    app.useGlobalPipes(new ValidationPipe());

    propertyRepository =
      moduleFixture.get<PropertyRepository>(PropertyRepository);
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
    testRuralProducerId = ruralProducer.id;
  };

  describe('/create-property (POST)', () => {
    it('should create a property successfully', async () => {
      const createPropertyDto: CreatePropertyDto = {
        farmName: 'Fazenda Teste',
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      const response = await request(app.getHttpServer())
        .post('/create-property')
        .send(createPropertyDto)
        .expect(201);

      expect(response).toBeDefined();
    });

    it('should not create a property without farmName', async () => {
      const createPropertyDto = {
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      const response = await request(app.getHttpServer())
        .post('/create-property')
        .send(createPropertyDto)
        .expect(400);

      expect(response.body.message).toContain('Nome da fazenda não informado.');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/update-property/:id (PUT)', () => {
    it('should update a property successfully', async () => {
      const createPropertyDto: CreatePropertyDto = {
        farmName: 'Fazenda Original',
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      await request(app.getHttpServer())
        .post('/create-property')
        .send(createPropertyDto)
        .expect(201);

      const allProperties = await propertyRepository.findAll();
      const property = allProperties.find(
        (allProperty) => allProperty.farmName === createPropertyDto.farmName,
      );

      const updatePropertyDto: UpdatePropertyDto = {
        farmName: 'Fazenda Atualizada',
        farmCity: 'Rio de Janeiro',
        farmState: 'RJ',
        totalAreaHectares: 200,
        arableAreaHectares: 150,
        vegetationAreaHectares: 50,
      };

      const response = await request(app.getHttpServer())
        .put(`/update-property/${property.id}`)
        .send(updatePropertyDto)
        .expect(200);

      expect(response).toBeDefined();

      const updatedProperty = await propertyRepository.findById(property.id);
      expect(updatedProperty.farmName).toBe(updatePropertyDto.farmName);
      expect(updatedProperty.farmCity).toBe(updatePropertyDto.farmCity);
      expect(updatedProperty.farmState).toBe(updatePropertyDto.farmState);
    });

    it('should not update a property with empty farmName', async () => {
      const createPropertyDto: CreatePropertyDto = {
        farmName: 'Fazenda Original',
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      await request(app.getHttpServer())
        .post('/create-property')
        .send(createPropertyDto)
        .expect(201);

      const allProperties = await propertyRepository.findAll();
      const property = allProperties.find(
        (allProperty) => allProperty.farmName === createPropertyDto.farmName,
      );

      const updatePropertyDto = {
        farmName: '',
        farmCity: 'Rio de Janeiro',
        farmState: 'RJ',
        totalAreaHectares: 200,
        arableAreaHectares: 150,
        vegetationAreaHectares: 50,
      };

      const response = await request(app.getHttpServer())
        .put(`/update-property/${property.id}`)
        .send(updatePropertyDto)
        .expect(400);

      expect(response.body.message).toContain('Nome da fazenda não informado.');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/delete-property/:id (DELETE)', () => {
    it('should delete a property successfully', async () => {
      const createPropertyDto: CreatePropertyDto = {
        farmName: 'Fazenda Para Deletar',
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      await request(app.getHttpServer())
        .post('/create-property')
        .send(createPropertyDto)
        .expect(201);

      const allProperties = await propertyRepository.findAll();
      const property = allProperties.find(
        (allProperty) => allProperty.farmName === createPropertyDto.farmName,
      );

      const response = await request(app.getHttpServer())
        .delete(`/delete-property/${property.id}`)
        .expect(200);

      expect(response).toBeDefined();

      const deletedProperty = await propertyRepository.findById(property.id);
      expect(deletedProperty).toBeNull();
    });

    it('should not delete a non-existent property', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .delete(`/delete-property/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Propriedade não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/get-properties (GET)', () => {
    it('should get all properties successfully', async () => {
      const property = {
        farmName: 'Fazenda A',
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      await request(app.getHttpServer())
        .post('/create-property')
        .send(property)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get('/get-properties')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(1);
      expect(response.body[0].farmName).toEqual(property.farmName);
    });

    it('should return empty array when no properties exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/get-properties')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(0);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/get-property-by-id/:id (GET)', () => {
    it('should get a property by id successfully', async () => {
      const createPropertyDto: CreatePropertyDto = {
        farmName: 'Fazenda Individual',
        farmCity: 'São Paulo',
        farmState: 'SP',
        totalAreaHectares: 100,
        arableAreaHectares: 80,
        vegetationAreaHectares: 20,
        ruralProducerId: testRuralProducerId,
      };

      await request(app.getHttpServer())
        .post('/create-property')
        .send(createPropertyDto)
        .expect(201);

      const allProperties = await propertyRepository.findAll();
      const property = allProperties.find(
        (allProperty) => allProperty.farmName === createPropertyDto.farmName,
      );

      const response = await request(app.getHttpServer())
        .get(`/get-property-by-id/${property.id}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(property.id);
      expect(response.body.farmName).toBe(createPropertyDto.farmName);
      expect(response.body.farmCity).toBe(createPropertyDto.farmCity);
      expect(response.body.farmState).toBe(createPropertyDto.farmState);
    });

    it('should not get a non-existent property', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .get(`/get-property-by-id/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Propriedade não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
