import type { UserEntity } from '../database/entities/User';
import { UsersSerializer } from './usersSerializer';

export class AuthSerializer {
  static item(user: UserEntity, token: string) {
    const userDetails = UsersSerializer.item(user);

    return {
      user: userDetails,
      token
    };
  }
}
