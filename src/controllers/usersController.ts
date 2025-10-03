import type { Request, Response } from 'express';

import { UserSerializer } from '@/serializers/usersSerializer';
import { UsersService } from '@/services/usersService';
import { getPaginationParams } from '@/utils/pagination';

export class UsersController {
  static async getAll(_req: Request, res: Response) {
    const users = await UsersService.getAll();

    res.json(UserSerializer.kv(users));
  }

  static async getPaginated(req: Request, res: Response) {
    const params = getPaginationParams(req.query);
    const [items, total] = await UsersService.getPaginated(params);

    res.json({ items: UserSerializer.list(items), total });
  }
}
