import { config } from 'dotenv';
config();

export const environment = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET as string
};
