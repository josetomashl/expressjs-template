import { Router } from 'express';

import { PostsController } from '../controllers/postController';

const postsRouter = Router();

postsRouter.get('/all', PostsController.getAll);
postsRouter.get('/', PostsController.getPaginated);
postsRouter.get('/:id', PostsController.getById);

export { postsRouter };
