import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  database: process.env.DB_NAME || 'expressdb',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  decimalNumbers: true
});
