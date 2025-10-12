import { DataSource } from 'typeorm';

import { environment } from '../configs/environment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  connectorPackage: 'mysql2',
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  dateStrings: true,
  logging: true,
  logger: 'file',
  synchronize: false,
  entities: ['dist/database/entities/*.js'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true
});
