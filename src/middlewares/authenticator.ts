import type { NextFunction, Request, Response } from 'express';

import { RolesEnum } from '../database/entities/User';
import { type TokenPayload, decodeToken } from '../utils/jwt';
import { SendResponse } from '../utils/response';

export interface AuthRequest extends Request {
  userId: string;
  userRole: RolesEnum;
}

export function authenticator(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.trim();

  if (!token?.startsWith('Bearer ') || !token.split(' ')[1]) {
    return SendResponse.unauthorized(res, 'No token found on request headers.');
  }

  const tokenValue = token.split(' ')[1];

  try {
    const decoded = decodeToken(tokenValue);
    const parsedValue = JSON.parse(decoded) as TokenPayload;
    req.userId = parsedValue.userId;
    req.userRole = parsedValue.userRole;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return SendResponse.unauthorized(res, error.message);
    }
    return SendResponse.error(res, 'Unexpected JWT error');
  }
}
