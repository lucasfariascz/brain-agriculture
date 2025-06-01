import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateRuralProducerDto } from '../../src/features/rural-producer/dtos/create-rural-producer.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { RuralProducerEntity } from '../../src/features/rural-producer/entities/rural-producer.entity';
import { CreateRuralProducerController } from '../../src/features/rural-producer/controllers/create-rural-producer/create-rural-producer.controller';
import { CreateRuralProducerService } from '../../src/features/rural-producer/services/create-rural-producer/create-rural-producer.service';
import { RuralProducerRepository } from '../../src/features/rural-producer/repositories/rural-producer.repository';
import { DatabaseModuleTest } from '../../src/shared/database/database-test.module';
import { UpdateRuralProducerController } from '../../src/features/rural-producer/controllers/update-rural-producer/update-rural-producer.controller';
import { UpdateRuralProducerService } from '../../src/features/rural-producer/services/update-rural-producer/update-rural-producer.service';
import { UpdateRuralProducerDto } from '../../src/features/rural-producer/dtos/update-rural-producer.dto';
import { DeleteRuralProducerController } from '../../src/features/rural-producer/controllers/delete-rural-producer/delete-rural-producer.controller';
import { DeleteRuralProducerService } from '../../src/features/rural-producer/services/delete-rural-producer/delete-rural-producer.service';
import { GetRuralProducersService } from '../../src/features/rural-producer/services/get-rural-producers/get-rural-producers.service';
import { GetRuralProducersController } from '../../src/features/rural-producer/controllers/get-rural-producers/get-rural-producers.controller';
import { GetRuralProducerByIdController } from '../../src/features/rural-producer/controllers/get-rural-producer-by-id/get-rural-producer-by-id.controller';
import { GetRuralProducerByIdService } from '../../src/features/rural-producer/services/get-rural-producer-by-id/get-rural-producer-by-id.service';

describe('RuralProducer (e2e)', () => {
  let app: INestApplication;
  let ruralProducerRepository: RuralProducerRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModuleTest,
        TypeOrmModule.forFeature([RuralProducerEntity]),
      ],
      controllers: [
        CreateRuralProducerController,
        UpdateRuralProducerController,
        DeleteRuralProducerController,
        GetRuralProducersController,
        GetRuralProducerByIdController,
      ],
      providers: [
        CreateRuralProducerService,
        UpdateRuralProducerService,
        DeleteRuralProducerService,
        GetRuralProducersService,
        GetRuralProducerByIdService,
        RuralProducerRepository,
      ],
      exports: [RuralProducerRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(false);
    app.useGlobalPipes(new ValidationPipe());
    ruralProducerRepository = moduleFixture.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
    await app.init();
  });

  describe('/create-rural-producer (POST)', () => {
    it('should create a rural producer successfully with CPF', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'John Doe',
        cpfOrCnpj: '026.481.632-39',
      };

      const response = await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(201);

      expect(response).toBeDefined();
    });

    it('should create a rural producer successfully with CNPJ', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'Farm Company Ltd',
        cpfOrCnpj: '45.997.418/0001-53',
      };

      const response = await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(201);

      expect(response).toBeDefined();
    });

    it('should not create a rural producer with invalid CPF', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'John Doe',
        cpfOrCnpj: '111.111.111-11',
      };

      const response = await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(400);

      expect(response.body.message).toEqual([
        'Documento inválido. Informe um CPF ou CNPJ válido.',
      ]);
    });

    it('should not create a rural producer with invalid CNPJ', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'Farm Company Ltd',
        cpfOrCnpj: '11.111.111/1111-11',
      };

      const response = await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(400);

      expect(response.body.message).toEqual([
        'Documento inválido. Informe um CPF ou CNPJ válido.',
      ]);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/update-rural-producer/:id (PUT)', () => {
    it('should update a rural producer successfully', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'John Doe',
        cpfOrCnpj: '026.481.632-39',
      };

      await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(201);

      const producer = await ruralProducerRepository.findByCpfOrCnpj(
        createRuralProducerDto.cpfOrCnpj,
      );

      const updateRuralProducerDto: UpdateRuralProducerDto = {
        name: 'John Doe Updated',
        cpfOrCnpj: '799.231.180-96',
      };

      const response = await request(app.getHttpServer())
        .put(`/update-rural-producer/${producer.id}`)
        .send(updateRuralProducerDto)
        .expect(200);

      expect(response).toBeDefined();

      const updatedProducer = await ruralProducerRepository.findById(
        producer.id,
      );

      expect(updatedProducer.name).toBe(updateRuralProducerDto.name);
      expect(updatedProducer.cpfOrCnpj).toBe(updateRuralProducerDto.cpfOrCnpj);
    });

    it('should not update a rural producer with invalid CPF', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'John Doe',
        cpfOrCnpj: '026.481.632-39',
      };

      await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(201);

      const producer = await ruralProducerRepository.findByCpfOrCnpj(
        createRuralProducerDto.cpfOrCnpj,
      );

      const updateRuralProducerDto: UpdateRuralProducerDto = {
        name: 'John Doe Updated',
        cpfOrCnpj: '111.111.111-11',
      };

      const response = await request(app.getHttpServer())
        .put(`/update-rural-producer/${producer.id}`)
        .send(updateRuralProducerDto)
        .expect(400);

      expect(response.body.message).toEqual([
        'Documento inválido. Informe um CPF ou CNPJ válido.',
      ]);
    });

    afterEach(async () => {
      await app.close();
    });
  });

  describe('/delete-rural-producer/:id (DELETE)', () => {
    it('should delete a rural producer successfully', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'John Doe',
        cpfOrCnpj: '026.481.632-39',
      };

      await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(201);

      const producer = await ruralProducerRepository.findByCpfOrCnpj(
        createRuralProducerDto.cpfOrCnpj,
      );

      const response = await request(app.getHttpServer())
        .delete(`/delete-rural-producer/${producer.id}`)
        .expect(200);

      expect(response).toBeDefined();

      const deletedProducer = await ruralProducerRepository.findById(
        producer.id,
      );
      expect(deletedProducer).toBeNull();
    });

    it('should not delete a non-existent rural producer', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .delete(`/delete-rural-producer/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Produtor rural não encontrado..');
    });
  });

  describe('/get-rural-producers (GET)', () => {
    it('should get all rural producers successfully', async () => {
      const producers = [
        {
          name: 'John Doe',
          cpfOrCnpj: '026.481.632-39',
        },
        {
          name: 'Jane Doe',
          cpfOrCnpj: '799.231.180-96',
        },
      ];

      for (const producer of producers) {
        await request(app.getHttpServer())
          .post('/create-rural-producer')
          .send(producer)
          .expect(201);
      }

      const response = await request(app.getHttpServer())
        .get('/get-rural-producers')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toEqual(producers[0].name);
      expect(response.body[0].cpfOrCnpj).toEqual(producers[0].cpfOrCnpj);
      expect(response.body[1].name).toEqual(producers[1].name);
      expect(response.body[1].cpfOrCnpj).toEqual(producers[1].cpfOrCnpj);
    });

    it('should return empty array when no producers exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/get-rural-producers')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.length).toBe(0);
    });
  });

  describe('/get-rural-producer-by-id/:id (GET)', () => {
    it('should get a rural producer by id successfully', async () => {
      const createRuralProducerDto: CreateRuralProducerDto = {
        name: 'John Doe',
        cpfOrCnpj: '026.481.632-39',
      };

      await request(app.getHttpServer())
        .post('/create-rural-producer')
        .send(createRuralProducerDto)
        .expect(201);

      const producer = await ruralProducerRepository.findByCpfOrCnpj(
        createRuralProducerDto.cpfOrCnpj,
      );

      const response = await request(app.getHttpServer())
        .get(`/get-rural-producer-by-id/${producer.id}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(producer.id);
      expect(response.body.name).toBe(createRuralProducerDto.name);
      expect(response.body.cpfOrCnpj).toBe(createRuralProducerDto.cpfOrCnpj);
    });

    it('should not get a non-existent rural producer', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .get(`/get-rural-producer-by-id/${nonExistentId}`)
        .expect(404);

      expect(response.body.message).toBe('Produtor rural não encontrado.');
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
