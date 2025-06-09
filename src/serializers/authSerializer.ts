import type { User } from '../models/User';

export class AuthSerializer {
  static item(user: User, token: string) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      is_removed: Boolean(user.is_removed),
      created_at: user.created_at,
      modified_at: user.modified_at,
      token: token
    };
  }
}
