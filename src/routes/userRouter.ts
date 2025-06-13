import express from 'express';

import { UserController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/all', UserController.getAll);
userRouter.get('/', UserController.getPaginated);

export { userRouter };
