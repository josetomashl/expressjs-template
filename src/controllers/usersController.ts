import type { Request, Response } from 'express';
import { UserSerializer } from '../serializers/usersSerializer';
import { UsersService } from '../services/usersService';

export class UsersController {
  static async getAll(_req: Request, res: Response) {
    const users = await UsersService.getAll();

    res.json(UserSerializer.kv(users));
  }

  static async getPaginated(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const paginatedUsers = await UsersService.getPaginated(page, limit);

    res.json({ ...paginatedUsers, items: UserSerializer.list(paginatedUsers.items) });
  }
}
