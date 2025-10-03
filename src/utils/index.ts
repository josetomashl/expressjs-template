import { AppDataSource } from '@/database/data-source';

export async function killProcess() {
  console.log('SIGTERM signal received: closing HTTP server');
  await AppDataSource.destroy();
  console.log('Database connection destroyed.');
  process.exit(0);
}
