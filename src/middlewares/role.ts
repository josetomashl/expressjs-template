import type { NextFunction, Response } from 'express';

import { RolesEnum } from '../database/entities/User';
import { SendResponse } from '../utils/response';
import type { AuthRequest } from './authenticator';

export function role(req: AuthRequest, res: Response, next: NextFunction, allowedRoles: RolesEnum[]) {
  if (!req.userRole || (req.userRole !== RolesEnum.SUPER && !allowedRoles.includes(req.userRole))) {
    return SendResponse.forbidden(res);
  }
  next();
}
