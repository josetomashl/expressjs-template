import { Router } from 'express';

import { createTagConstraint } from 'src/constraints/tagContraints';
import { validator } from 'src/middlewares/validator';
import { TagsController } from '../controllers/tagsController';

const tagsRouter = Router();

tagsRouter.get('/all', TagsController.getAll);
tagsRouter.get('/', TagsController.getPaginated);
tagsRouter.get('/:id', TagsController.getById);
tagsRouter.post('/', validator(createTagConstraint), TagsController.create);
tagsRouter.patch('/:id', TagsController.softRemove);
tagsRouter.delete('/:id', TagsController.remove);

export { tagsRouter };
