import type { User } from '../models/User';

export class AuthSerializer {
  static item(user: User, token: string) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      full_name: user.name + ' ' + user.surname,
      role: user.role,
      is_removed: user.is_removed,
      created_at: user.created_at,
      modified_at: user.modified_at,
      token: token
    };
  }
}
