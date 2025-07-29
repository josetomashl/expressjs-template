import type SMTPPool from 'nodemailer/lib/smtp-pool';
import { environment } from './environment';

export const nodemailerOptions: SMTPPool.Options = {
  pool: true,
  host: environment.SMTP_HOST,
  port: environment.SMTP_PORT,
  secure: environment.SMTP_SECURE,
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: environment.SMTP_USER,
    pass: environment.SMTP_PASS,
  },
  logger: environment.MODE === 'development',
  debug: environment.MODE === 'development',
};
