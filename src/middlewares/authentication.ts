import { type NextFunction, type Request, type Response } from 'express';

export default function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization?.includes('Bearer ')) {
    // decode && check token
    // const token = req.headers.authorization.split(' ')[1];
    next();
  } else {
    res.status(403).json('Unauthorized');
  }
}
