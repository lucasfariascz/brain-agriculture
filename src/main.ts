import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/config/exceptions/all-exceptions-filter';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: ['transaction-id'],
  });

  const config = new DocumentBuilder()
    .setTitle('API de Gerenciamento de Propriedades Agrícolas')
    .setDescription('API para gerenciar propriedades agrícolas')
    .setVersion('1.0')
    .addTag('Property - Propriedades Agrícolas', 'Propriedades Agrícolas')
    .addTag('Rural Producer - Produtores Rurais', 'Produtores Rurais')
    .addTag('Harvest - Safra', 'Safra')
    .addTag('Plant Crop - Plantar Colheita', 'Plantar Colheita')
    .addTag('Dashboard')
    .build();

  const options: SwaggerDocumentOptions = {
    autoTagControllers: false,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: '/api-docs-json',
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
