import { config } from 'dotenv';
config();

const environment = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET as string
};

export default environment;
