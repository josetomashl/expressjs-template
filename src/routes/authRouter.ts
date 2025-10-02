import { Router } from 'express';

import { loginConstraint, refreshTokenConstraint, registerConstraint } from '@/constraints/authConstraints';
import { AuthController } from '@/controllers/authController';
import { validator } from '@/middlewares/validator';

const authRouter = Router();

authRouter.post('/login', validator(loginConstraint), AuthController.login);
authRouter.post('/register', validator(registerConstraint), AuthController.register);
authRouter.post('/refreshToken', validator(refreshTokenConstraint), AuthController.refreshToken);

export { authRouter };
