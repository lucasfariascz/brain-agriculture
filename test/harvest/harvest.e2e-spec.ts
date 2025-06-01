import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateHarvestDto } from '../../src/features/harvest/dtos/create-harvest.dto';
import { UpdateHarvestDto } from '../../src/features/harvest/dtos/update-harvest.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { HarvestEntity } from '../../src/features/harvest/entities/harvest.entity';
import { HarvestRepository } from '../../src/features/harvest/repositories/harvest.repository';
import { DeleteHarvestService } from '../../src/features/harvest/services/delete-harvest/delete-harvest.service';
import { CreateHarvestService } from '../../src/features/harvest/services/create-harvest/create-harvest.service';
import { DatabaseModuleTest } from '../../src/shared/database/database-test.module';
import { CreateHarvestController } from '../../src/features/harvest/controllers/create-harvest/create-harvest.controller';
import { UpdateHarvestController } from '../../src/features/harvest/controllers/update-harvest/update-harvest.controller';
import { GetHarvestByIdService } from '../../src/features/harvest/services/get-harvest-by-id/get-harvest-by-id.service';
import { GetHarvestByIdController } from '../../src/features/harvest/controllers/get-harvest-by-id/get-harvest-by-id.controller';
import { UpdateHarvestService } from '../../src/features/harvest/services/update-harvest/update-harvest.service';
import { DeleteHarvestController } from '../../src/features/harvest/controllers/delete-harvest/delete-harvest.controller';
import { GetHarvestsService } from '../../src/features/harvest/services/get-harvests/get-harvests.service';
import { GetHarvestsController } from '../../src/features/harvest/controllers/get-harvests/get-harvests.controller';

describe('Harvest (e2e)', () => {
  let app: INestApplication;
  let harvestRepository: HarvestRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModuleTest, TypeOrmModule.forFeature([HarvestEntity])],
      controllers: [
        CreateHarvestController,
        UpdateHarvestController,
        DeleteHarvestController,
        GetHarvestsController,
        GetHarvestByIdController,
      ],
      providers: [
        CreateHarvestService,
        UpdateHarvestService,
        DeleteHarvestService,
        GetHarvestsService,
        GetHarvestByIdService,
        HarvestRepository,
      ],
      exports: [HarvestRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    app.useGlobalPipes(new ValidationPipe());
    harvestRepository = moduleFixture.get<HarvestRepository>(HarvestRepository);
    await app.init();
  });

  describe('/create-harvest (POST)', () => {
    it('should create a harvest successfully', async () => {
      const createHarvestDto: CreateHarvestDto = {
        year: 2023,
      };

      const response = await request(app.getHttpServer())
        .post('/create-harvest')
        .send(createHarvestDto)
        .expect(201);

      expect(response).toBeDefined();
    });

    it('should not create a harvest without year', async () => {
      const createHarvestDto = {};

      const response = await request(app.getHttpServer())
        .post('/create-harvest')
        .send(createHarvestDto)
        .expect(400);

      expect(response.body.message).toEqual([
        'Ano da safra inválido. Informe um ano válido.',
        'Ano da safra inválido. Informe um ano válido.',
        'Ano da safra não informado.',
      ]);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/update-harvest/:id (PUT)', () => {
    it('should update a harvest successfully', async () => {
      const createHarvestDto: CreateHarvestDto = {
        year: 2023,
      };

      await request(app.getHttpServer())
        .post('/create-harvest')
        .send(createHarvestDto)
        .expect(201);

      const allHarvests = await harvestRepository.findAll();
      const harvest = allHarvests.find(
        (allHarvest) => allHarvest.year === createHarvestDto.year,
      );

      const updateHarvestDto: UpdateHarvestDto = {
        year: 2024,
      };

      const response = await request(app.getHttpServer())
        .put(`/update-harvest/${harvest.id}`)
        .send(updateHarvestDto)
        .expect(200);

      expect(response).toBeDefined();

      const updatedHarvest = await harvestRepository.findById(harvest.id);
      expect(updatedHarvest.year).toBe(updateHarvestDto.year);
    });

    it('should not update a harvest with invalid year', async () => {
      const createHarvestDto: CreateHarvestDto = {
        year: 2023,
      };

      await request(app.getHttpServer())
        .post('/create-harvest')
        .send(createHarvestDto)
        .expect(201);

      const allHarvests = await harvestRepository.findAll();
      const harvest = allHarvests.find(
        (allHarvest) => allHarvest.year === createHarvestDto.year,
      );

      const updateHarvestDto = {
        year: 'invalid-year',
      };

      const response = await request(app.getHttpServer())
        .put(`/update-harvest/${harvest.id}`)
        .send(updateHarvestDto)
        .expect(400);

      expect(response.body.message).toEqual([
        'Ano da safra inválido. Informe um ano válido.',
        'Ano da safra inválido. Informe um ano válido.',
      ]);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/delete-harvest/:id (DELETE)', () => {
    it('should delete a harvest successfully', async () => {
      const createHarvestDto: CreateHarvestDto = {
        year: 2023,
      };

      await request(app.getHttpServer())
        .post('/create-harvest')
        .send(createHarvestDto)
        .expect(201);

      const allHarvests = await harvestRepository.findAll();
      const harvest = allHarvests.find(
        (allHarvest) => allHarvest.year === createHarvestDto.year,
      );

      const response = await request(app.getHttpServer())
        .delete(`/delete-harvest/${harvest.id}`)
        .expect(200);

      expect(response).toBeDefined();

      const deletedHarvest = await harvestRepository.findById(harvest.id);
      expect(deletedHarvest).toBeNull();
    });

    it('should not delete a non-existent harvest', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .delete(`/delete-harvest/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Safra não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/get-harvests (GET)', () => {
    it('should get all harvests successfully', async () => {
      const harvests = [{ year: 2021 }, { year: 2022 }, { year: 2023 }];

      for (const harvest of harvests) {
        await request(app.getHttpServer())
          .post('/create-harvest')
          .send(harvest)
          .expect(201);
      }

      const response = await request(app.getHttpServer())
        .get('/get-harvests')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(3);
      expect(response.body[0].year).toEqual(harvests[0].year);
      expect(response.body[1].year).toEqual(harvests[1].year);
      expect(response.body[2].year).toEqual(harvests[2].year);
    });

    it('should return empty array when no harvests exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/get-harvests')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(0);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/get-harvest-by-id/:id (GET)', () => {
    it('should get a harvest by id successfully', async () => {
      const createHarvestDto: CreateHarvestDto = {
        year: 2023,
      };

      await request(app.getHttpServer())
        .post('/create-harvest')
        .send(createHarvestDto)
        .expect(201);

      const allHarvests = await harvestRepository.findAll();
      const harvest = allHarvests.find(
        (allHarvest) => allHarvest.year === createHarvestDto.year,
      );

      const response = await request(app.getHttpServer())
        .get(`/get-harvest-by-id/${harvest.id}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(harvest.id);
      expect(response.body.year).toBe(createHarvestDto.year);
      expect(response.body.text).toBe('Safra');
    });

    it('should not get a non-existent harvest', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .get(`/get-harvest-by-id/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Safra não encontrada');
    });

    afterEach(async () => {
      await app.close();
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
