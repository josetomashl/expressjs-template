import { transporter } from './mailer';

export async function killProcess() {
  console.log('SIGTERM signal received: closing HTTP server');
  await transporter.close();
  console.log('Nodemailer transporter closed.');
  process.exit(0);
}
