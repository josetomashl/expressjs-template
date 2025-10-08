import type { Request, Response } from 'express';

import type { AuthRequest } from '../middlewares/authenticator';
import { PostsSerializer } from '../serializers/postsSerializer';
import { PostsService } from '../services/postsService';
import { UsersService } from '../services/usersService';
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

  static async create(req: AuthRequest, res: Response) {
    const { title, content, status, tags } = req.body;
    const previousPost = await PostsService.getByTitle(title);
    if (previousPost) {
      return SendResponse.badRequest(res, `Post with title "${title}" already exists`);
    }

    const user = await UsersService.getById(req.userId);
    if (!user) {
      return SendResponse.notFound(res, 'User');
    }

    const post = await PostsService.create(title, content, status, tags, user);

    return SendResponse.success(res, PostsSerializer.item(post));
  }

  static async update(req: Request, res: Response) {
    const { title, content, status, tags, user_id } = req.body;
    const previousPost = await PostsService.getByTitle(title);
    if (!previousPost) {
      return SendResponse.notFound(res, 'Post');
    }

    if (previousPost.title !== title) {
      previousPost.title = title;
    }

    if (previousPost.content !== content) {
      previousPost.content = content;
    }

    if (previousPost.status !== status) {
      previousPost.status = status;
    }

    const user = await UsersService.getById(user_id);
    if (user_id && user && previousPost.user.id !== user_id) {
      previousPost.user = user;
    }

    if (JSON.stringify(previousPost.tags.map((t) => t.name)) !== JSON.stringify(tags)) {
      previousPost.tags = tags;
    }

    const post = await PostsService.update(previousPost);

    return SendResponse.success(res, PostsSerializer.item(post));
  }

  static async softRemove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Post ID not provided.');
    }

    let post = await PostsService.getById(id);
    if (!post) {
      return SendResponse.notFound(res, 'Post');
    }

    if (post.deletedAt) {
      post = await PostsService.recover(post);
    } else {
      post = await PostsService.softRemove(post);
    }

    return SendResponse.success(res, PostsSerializer.item(post));
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Post ID not provided.');
    }

    const post = await PostsService.getById(id);
    if (!post) {
      return SendResponse.notFound(res, 'Post');
    }

    await PostsService.remove(post);

    return SendResponse.success(res, null);
  }
}
