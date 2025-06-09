import type { NextFunction, Request, Response } from 'express';
import { type TokenPayload, verifyToken } from '../utils/jwt';

export function authenticator(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  if (token) {
    verifyToken(
      token,
      (error) => {
        res.status(401).json(error);
      },
      (value) => {
        try {
          const parsedValue = JSON.parse(value) as TokenPayload;
          res.locals.userId = parsedValue.userId;
          next();
        } catch {
          res.status(401).json({ error: 'Unauthorized' });
        }
      }
    );
  } else {
    res.status(401).json({ error: 'Unauthorized. No token found on request.' });
  }
}
