import type { User } from '../models/User';

export class UserSerializer {
  static list(users: User[]) {
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      is_removed: Boolean(user.is_removed),
      created_at: user.created_at,
      modified_at: user.modified_at
    }));
  }

  static item(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      is_removed: Boolean(user.is_removed),
      created_at: user.created_at,
      modified_at: user.modified_at
    };
  }
}
