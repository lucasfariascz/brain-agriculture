import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RuralProducerModule } from './features/rural-producer/rural-producer.module';
import { PropertyModule } from './features/property/property.module';
import { HarvestModule } from './features/harvest/harvest.module';
import { PlantCropModule } from './features/plat-crop/plant-crop.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { logFormat } from './shared/config/log/winston/winston.config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogService } from './shared/config/service/log.service';
import { TransactionInterceptor } from './shared/config/log/interceptors/transaction.interceptor';
import { TransactionMiddleware } from './shared/config/middleware/transaction.middleware';
import { LoggingInterceptor } from './shared/config/log/interceptors/logging.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WinstonModule.forRoot({
      level: 'info',
      format: logFormat,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    }),
    RuralProducerModule,
    PropertyModule,
    HarvestModule,
    PlantCropModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    LogService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
