import { Router } from 'express';

import { createUserConstraint, updateUserConstraint } from '../constraints/userContraints';
import { UsersController } from '../controllers/usersController';
import { validator } from '../middlewares/validator';

const usersRouter = Router();

usersRouter.get('/all', UsersController.getAll);
usersRouter.get('/', UsersController.getPaginated);
usersRouter.get('/:id', UsersController.getById);
usersRouter.post('/', validator(createUserConstraint), UsersController.create);
usersRouter.patch('/:id', validator(updateUserConstraint), UsersController.update);
usersRouter.patch('/:id', UsersController.softRemove);
usersRouter.delete('/:id', UsersController.remove);

export { usersRouter };
