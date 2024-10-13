import { type NextFunction, type Request, type Response } from 'express';

export default function logger(req: Request, _res: Response, next: NextFunction) {
  console.log('%s %s %s %s', new Date().toJSON(), req.method, req.url, req.path);
  next();
}
