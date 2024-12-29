process.loadEnvFile();

const { NODE_ENV = 'development', PORT = 3000, JWT_SECRET = '' } = process.env;

export const environment = {
  MODE: NODE_ENV,
  PORT: Number(PORT),
  JWT_SECRET: String(JWT_SECRET)
};
