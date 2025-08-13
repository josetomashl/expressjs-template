import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    console.error(err);
    return next(err);
  }
  res.status(500).send({ error: err.message });
}
