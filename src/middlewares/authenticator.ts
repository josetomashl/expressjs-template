import type { NextFunction, Request, Response } from 'express';

import { type TokenPayload, verifyToken } from '../utils/jwt';
import { SendResponse } from '../utils/response';

export function authenticator(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.trim();
  if (token) {
    verifyToken(
      token,
      (error) => {
        SendResponse.unauthorized(res, error);
      },
      (value) => {
        try {
          const parsedValue = JSON.parse(value) as TokenPayload;
          (req as Request & { userId?: string }).userId = parsedValue.userId;
          next();
        } catch {
          SendResponse.unauthorized(res);
        }
      }
    );
  } else {
    SendResponse.unauthorized(res, 'No token found on request headers.');
  }
}
