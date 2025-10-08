import { Router } from 'express';

import { createPostConstraint, updatePostContraint } from 'src/constraints/postConstraints';
import { validator } from 'src/middlewares/validator';
import { PostsController } from '../controllers/postsController';

const postsRouter = Router();

postsRouter.get('/all', PostsController.getAll);
postsRouter.get('/', PostsController.getPaginated);
postsRouter.get('/:id', PostsController.getById);
postsRouter.post('/', validator(createPostConstraint), PostsController.create);
postsRouter.patch('/:id', validator(updatePostContraint), PostsController.update);
postsRouter.patch('/:id', PostsController.softRemove);
postsRouter.delete('/:id', PostsController.remove);

export { postsRouter };
