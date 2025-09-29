import { DataSource } from 'typeorm';
import { environment } from '../configs/environment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  connectorPackage: 'mysql2',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  dateStrings: true,
  entities: ['src/database/entities/*.js'],
  logging: true,
  logger: 'file',
  synchronize: environment.MODE !== 'production',
  migrations: ['src/database/migrations/*.js'],
  migrationsRun: true
});
