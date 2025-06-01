import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'brain-agriculture-test',
      password: 'brain12345678test',
      database: 'database-brain-agriculture-test',
      entities: [join(__dirname, '..', '..', '..', '**', '*.entity.{ts,js}')],
      synchronize: true,
      dropSchema: true,
    }),
  ],
})
export class DatabaseModuleTest {}
