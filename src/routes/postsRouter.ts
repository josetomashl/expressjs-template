import { Router } from 'express';

import { PostsController } from '../controllers/postsController';

const postsRouter = Router();

postsRouter.get('/all', PostsController.getAll);
postsRouter.get('/', PostsController.getPaginated);
postsRouter.get('/:id', PostsController.getById);

export { postsRouter };
