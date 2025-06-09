import type { User } from '../models/User';

export class AuthSerializer {
  static item(user: User, token: string) {
    return {
      id: user.id,
      email: user.email,
      is_removed: user.is_removed,
      created_at: user.created_at,
      updated_at: user.updated_at,
      token: token
    };
  }
}
