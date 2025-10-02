process.loadEnvFile();

const {
  NODE_ENV = 'development',
  PORT = '3000',
  JWT_SECRET = 'secret',
  JWT_REFRESH_SECRET = 'refresh_secret',
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'expressdb',
  DB_PASSWORD = 'expressdb',
  DB_NAME = 'expressdb',
  SMTP_HOST = 'localhost',
  SMTP_PORT = '587',
  SMTP_USER = 'user@example.com',
  SMTP_PASS = 'password',
  SMTP_SECURE = 'false'
} = process.env;

export const environment = {
  MODE: NODE_ENV,
  PORT: parseInt(PORT, 10),
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  DB_HOST,
  DB_PORT: parseInt(DB_PORT, 10),
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SMTP_HOST,
  SMTP_PORT: parseInt(SMTP_PORT, 10),
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE: SMTP_SECURE === 'true'
};
