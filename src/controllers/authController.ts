import type { Request, Response } from 'express';

import { environment } from '../configs/environment';
import { AuthSerializer } from '../serializers/authSerializer';
import { AuthService } from '../services/authService';
import { createToken } from '../utils/jwt';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const user = await AuthService.login(req.body);
      const token = createToken({ userId: user.id, userRole: user.role });
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: environment.MODE === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24
        })
        .json(AuthSerializer.item(user, token));
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Error al iniciar sesión.'
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      if (!user) {
        throw new Error('No se ha podido crear el usuario.');
      }
      const token = createToken({ userId: user.id, userRole: user.role });
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: environment.MODE === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24
        })
        .json(AuthSerializer.item(user, token));
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Error al registrar usuario.'
      });
    }
  }
}
