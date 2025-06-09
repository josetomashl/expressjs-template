import type { User } from '../models/User';

export class UserSerializer {
  static list(users: User[]) {
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      created_at: user.created_at
    }));
  }
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
