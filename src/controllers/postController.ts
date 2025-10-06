import type { Request, Response } from 'express';

import { PostsSerializer } from '../serializers/postsSerializer';
import { PostsService } from '../services/postsService';
import { getPaginationParams } from '../utils/pagination';
import { SendResponse } from '../utils/response';

export class PostsController {
  static async getAll(_req: Request, res: Response) {
    const posts = await PostsService.getAll();

    return SendResponse.success(res, PostsSerializer.kv(posts));
  }

  static async getPaginated(req: Request, res: Response) {
    const params = getPaginationParams(req.query);
    const [items, total] = await PostsService.getPaginated(params);

    return SendResponse.success(res, { items: PostsSerializer.list(items), total });
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Post ID not provided.');
    }

    const post = await PostsService.getById(id);
    if (!post) {
      return SendResponse.notFound(res, 'Post');
    }

    return SendResponse.success(res, PostsSerializer.item(post));
  }
}
