import type { Request, Response } from 'express';
import { AuthSerializer } from '../serializers/authSerializer';
import { AuthService } from '../services/authService';
import { createToken } from '../utils/jwt';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.login(email, password);
      const token = createToken({ userId: user.id });
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
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
    const { email, password } = req.body;
    try {
      const user = await AuthService.register(email, password);
      const token = createToken({ userId: user.id });
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
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
