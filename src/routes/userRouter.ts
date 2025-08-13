import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userRouter = Router();

userRouter.get('/all', UserController.getAll);
userRouter.get('/', UserController.getPaginated);

export { userRouter };
