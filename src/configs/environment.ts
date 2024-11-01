import dotenv from 'dotenv';
dotenv.config();

const environment = {
  mode: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  jwtSecret: String(process.env.JWT_SECRET)
};

export default environment;
