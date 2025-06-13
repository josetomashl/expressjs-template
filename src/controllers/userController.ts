import type { Request, Response } from 'express';
import { UserSerializer } from '../serializers/userSerializer';
import { UserService } from '../services/userService';

export class UserController {
  static async getAll(_req: Request, res: Response) {
    const users = await UserService.getAll();

    res.json(UserSerializer.kv(users));
  }

  static async getPaginated(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const paginatedUsers = await UserService.getPaginated(page, limit);

    res.json({ ...paginatedUsers, items: UserSerializer.list(paginatedUsers.items) });
  }
}
