import { AppDataSource } from '@/database/data-source';
import { transporter } from './mailer';

export async function killProcess() {
  console.log('SIGTERM signal received: closing HTTP server');
  transporter.close();
  console.log('Nodemailer transporter closed.');
  await AppDataSource.destroy();
  console.log('Database connection destroyed.');
  process.exit(0);
}
