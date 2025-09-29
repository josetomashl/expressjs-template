import type { Request, Response } from 'express';

import { PostsSerializer } from '../serializers/postsSerializer';
import { PostsService } from '../services/postsService';
import { getQueryParams } from '../utils/pagination';

export class PostsController {
  static async getAll(_req: Request, res: Response) {
    const posts = await PostsService.getAll();

    res.json(PostsSerializer.kv(posts));
  }

  static async getPaginated(req: Request, res: Response) {
    const params = getQueryParams(req.query);
    const [items, total] = await PostsService.getPaginated(params);

    res.json({ items: PostsSerializer.list(items), total });
  }
}
