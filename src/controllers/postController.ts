import type { Request, Response } from 'express';
import { PostsSerializer } from '../serializers/postsSerializer';
import { PostsService } from '../services/postsService';

export class PostsController {
  static async getAll(_req: Request, res: Response) {
    const posts = await PostsService.getAll();

    res.json(PostsSerializer.kv(posts));
  }

  static async getPaginated(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const paginatedUsers = await PostsService.getPaginated(page, limit);

    res.json({ ...paginatedUsers, items: PostsSerializer.list(paginatedUsers.items) });
  }
}
