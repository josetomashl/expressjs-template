process.loadEnvFile();

const {
  NODE_ENV = 'development',
  PORT = '3000',
  JWT_SECRET = '',
  SMTP_HOST = 'localhost',
  SMTP_PORT = '587',
  SMTP_USER = 'user@example.com',
  SMTP_PASS = 'password',
  SMTP_SECURE = 'false',
} = process.env;

export const environment = {
  MODE: NODE_ENV,
  PORT: parseInt(PORT, 10),
  JWT_SECRET: JWT_SECRET,
  SMTP_HOST: SMTP_HOST,
  SMTP_PORT: parseInt(SMTP_PORT, 10),
  SMTP_USER: SMTP_USER,
  SMTP_PASS: SMTP_PASS,
  SMTP_SECURE: SMTP_SECURE === 'true',
};
