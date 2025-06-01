import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'brain_agriculture_prod',
  password: 'brain_agriculture_prod',
  database: 'database_brain_agriculture_prod',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: false,
});
