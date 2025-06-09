import type { Request, Response } from 'express';
import { UserSerializer } from '../serializers/userSerializer';
import { UserService } from '../services/userService';

export class UserController {
  static async getAll(req: Request, res: Response) {
    console.log('Request user id: ', req.auth?.userId);

    const users = await UserService.getAll();
    res.json(UserSerializer.list(users));
  }
}
