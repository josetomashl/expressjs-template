import type { NextFunction, Request, Response } from 'express';

export default function logger(req: Request, _res: Response, next: NextFunction) {
  console.log('%s %s %s', new Date().toJSON(), req.method, req.originalUrl);
  next();
}
