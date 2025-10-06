import type { Request, Response } from 'express';

import { environment } from '../configs/environment';
import { AuthSerializer } from '../serializers/authSerializer';
import { AuthService } from '../services/authService';
import { UsersService } from '../services/usersService';
import { createRefreshToken, createToken, verifyRefreshToken } from '../utils/jwt';
import { SendResponse } from '../utils/response';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.login(email, password);
      const token = createToken({ userId: user.id });
      const refreshToken = createRefreshToken({ userId: user.id });
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: environment.MODE === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: environment.MODE === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .json(AuthSerializer.item(user, token, refreshToken));
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Error al iniciar sesión.'
      });
    }
  }

  static async register(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    try {
      const user = await AuthService.register(name.trim(), surname.trim(), email.trim(), password.trim());
      if (!user) {
        throw new Error('No se ha podido crear el usuario.');
      }
      const token = createToken({ userId: user.id });
      const refreshToken = createRefreshToken({ userId: user.id });
      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: environment.MODE === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: environment.MODE === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .json(AuthSerializer.item(user, token, refreshToken));
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Error al registrar usuario.'
      });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    const { refresh_token } = req.body;
    try {
      verifyRefreshToken(
        refresh_token,
        (error) => {
          throw new Error(error);
        },
        async (userId) => {
          const user = await UsersService.getById(userId);
          if (!user) {
            return SendResponse.notFound(res, 'User');
          }
          const token = createToken({ userId: user.id });
          const refreshToken = createRefreshToken({ userId: user.id });
          res
            .cookie('access_token', token, {
              httpOnly: true,
              secure: environment.MODE === 'production',
              sameSite: 'strict',
              maxAge: 1000 * 60 * 60 * 24
            })
            .cookie('refresh_token', refreshToken, {
              httpOnly: true,
              secure: environment.MODE === 'production',
              sameSite: 'strict',
              maxAge: 1000 * 60 * 60 * 24 * 7
            })
            .json(AuthSerializer.item(user, token, refreshToken));
        }
      );
    } catch (error) {
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Error al iniciar sesión.'
      });
    }
  }
}
