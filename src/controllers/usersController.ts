import type { Request, Response } from 'express';

import { UsersSerializer } from '../serializers/usersSerializer';
import { UsersService } from '../services/usersService';
import { getPaginationParams } from '../utils/pagination';
import { SendResponse } from '../utils/response';

export class UsersController {
  static async getAll(_req: Request, res: Response) {
    const users = await UsersService.getAll();

    res.json(UsersSerializer.kv(users));
  }

  static async getPaginated(req: Request, res: Response) {
    const params = getPaginationParams(req.query);
    const [items, total] = await UsersService.getPaginated(params);

    res.json({ items: UsersSerializer.list(items), total });
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'User ID not provided.');
    }

    const user = await UsersService.getById(id);
    if (!user) {
      return SendResponse.notFound(res, 'User');
    }

    return SendResponse.success(res, UsersSerializer.item(user));
  }
}
