import { verifyToken } from '../utils/jwt';
import type { NextFunction, Request, Response } from 'express';

export default function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    if (token && token.length === 256) {
      verifyToken(
        token,
        (error) => {
          res.status(401).json(error);
        },
        (value) => {
          try {
            const parsedValue = JSON.parse(value);
            req.auth = parsedValue;
            res.locals.userId = parsedValue.userId;
            next();
            // TODO: try different approaches and see which of them works on the private controller & remove those wich does not work. Preference: auth --> locals
          } catch {
            res.status(401).json('Unauthorized');
          }
        }
      );
    } else {
      res.status(401).json('Unauthorized');
    }
  } else {
    res.status(401).json('Unauthorized');
  }
}
