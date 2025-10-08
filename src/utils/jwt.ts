import { sign, verify } from 'jsonwebtoken';

import { environment } from '../configs/environment';
import { RolesEnum } from '../database/entities/User';

export type TokenPayload = {
  userId: string;
  userRole: RolesEnum;
  iat?: number;
  exp?: number;
};

export function createToken(payload: TokenPayload): string {
  return sign(payload, environment.JWT_SECRET, {
    allowInsecureKeySizes: false,
    expiresIn: '24h'
  });
}

export function decodeToken(token: string): string {
  try {
    const decoded = verify(token, environment.JWT_SECRET, { clockTolerance: 60 });

    return typeof decoded === 'string' ? decoded : JSON.stringify(decoded);
  } catch {
    throw new Error('JWT verification failed');
  }
}
