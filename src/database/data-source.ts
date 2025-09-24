import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: ['src/database/entities/*.js'],
  logging: true,
  logger: 'file',
  synchronize: true,
  migrations: ['src/database/migrations/*.js'],
  migrationsRun: true
});
