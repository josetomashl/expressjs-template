import type { Request, Response } from 'express';
import { UserSerializer } from '../serializers/userSerializer';
import { UserService } from '../services/userService';

export class UserController {
  static async getAll(_req: Request, res: Response) {
    const users = await UserService.getAll();
    res.json(UserSerializer.list(users));
  }
}
