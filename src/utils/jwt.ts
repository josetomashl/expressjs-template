import jwt from 'jsonwebtoken';
import environment from '../configs/environment';

export type TokenPayload = {
  //! MUST MATCH CustomRequest.d.ts file
  userId: string;
};

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, environment.jwtSecret, {
    allowInsecureKeySizes: false,
    algorithm: 'RS256',
    expiresIn: '24h'
  });
}

export function verifyToken(
  token: string,
  onErrorCallback: (errorValue: string) => void,
  onSuccessCallback: (decodedValue: string) => void
) {
  try {
    jwt.verify(token, environment.jwtSecret, { algorithms: ['RS256'], clockTolerance: 60 }, function (err, decoded) {
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

export function refreshToken() {
  // TODO refresh token on expired & valid tokens
}
