import express from 'express';

import validateData from '../middlewares/validation';
import { loginConstraint, registerConstraint } from '../constraints/authConstraints';
import { login, register } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', validateData(loginConstraint), login);
authRouter.post('/register', validateData(registerConstraint), register);

export default authRouter;
