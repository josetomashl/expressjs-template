import { Router } from 'express';

import { createTagConstraint } from '../constraints/tagContraints';
import { TagsController } from '../controllers/tagsController';
import { validator } from '../middlewares/validator';

const tagsRouter = Router();

tagsRouter.get('/all', TagsController.getAll);
tagsRouter.get('/', TagsController.getPaginated);
tagsRouter.get('/:id', TagsController.getById);
tagsRouter.post('/', validator(createTagConstraint), TagsController.create);
tagsRouter.patch('/:id', TagsController.softRemove);
tagsRouter.delete('/:id', TagsController.remove);

export { tagsRouter };
