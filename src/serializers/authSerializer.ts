import type { UserEntity } from '@/database/entities/User';
import { UserSerializer } from './usersSerializer';

export class AuthSerializer {
  static item(user: UserEntity, token: string, refreshToken: string) {
    const userDetails = UserSerializer.item(user);

    return {
      user: userDetails,
      token,
      refreshToken
    };
  }
}
