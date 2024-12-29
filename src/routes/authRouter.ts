import express from 'express';

import { loginConstraint, registerConstraint } from '../constraints/authConstraints';
import { login, register } from '../controllers/authController';
import { validator } from '../middlewares/validator';

const authRouter = express.Router();

authRouter.post('/login', validator(loginConstraint), login);
authRouter.post('/register', validator(registerConstraint), register);

export { authRouter };
