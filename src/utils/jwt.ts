import jwt from 'jsonwebtoken';
import { environment } from '../configs/environment';

export type TokenPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, environment.JWT_SECRET, {
    allowInsecureKeySizes: false,
    expiresIn: '24h'
  });
}

export function verifyToken(
  token: string,
  onErrorCallback: (errorValue: string) => void,
  onSuccessCallback: (decodedValue: string) => void
) {
  try {
    jwt.verify(token, environment.JWT_SECRET, { clockTolerance: 60 }, function (err, decoded) {
      if (err) {
        return onErrorCallback(err.message);
      } else if (decoded) {
        return onSuccessCallback(typeof decoded === 'string' ? decoded : JSON.stringify(decoded));
      } else {
        return onErrorCallback('unknown jwt error');
      }
    });
  } catch {
    return onErrorCallback('unexpected jwt error');
  }
}
