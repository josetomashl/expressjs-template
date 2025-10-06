import { Router } from 'express';

import { UsersController } from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/all', UsersController.getAll);
usersRouter.get('/', UsersController.getPaginated);

export { usersRouter };
