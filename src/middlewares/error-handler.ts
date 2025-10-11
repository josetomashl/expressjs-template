import type { NextFunction, Request, Response } from 'express';

import { SendResponse } from '../utils/response';

export function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  return SendResponse.error(res, err.message);
}
