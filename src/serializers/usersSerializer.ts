import type { User } from '../models/User';

export class UserSerializer {
  static kv(users: User[]) {
    return users.map((user) => ({
      id: user.id,
      full_name: user.name + ' ' + user.surname
    }));
  }

  static list(users: User[]) {
    return users.map((user) => ({
      id: user.id,
      full_name: user.name + ' ' + user.surname,
      email: user.email,
      is_removed: user.is_removed,
      created_at: user.created_at
    }));
  }

  static item(user: User) {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      full_name: user.name + ' ' + user.surname,
      email: user.email,
      role: user.role,
      is_removed: user.is_removed,
      created_at: user.created_at,
      modified_at: user.modified_at
    };
  }
}
