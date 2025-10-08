import type { User } from '../database/entities/User';
import { PostsSerializer } from './postsSerializer';

export class UsersSerializer {
  static kv(users: User[]) {
    return users.map((user) => ({
      id: user.id,
      full_name: user.getFullName()
    }));
  }

  static list(users: User[]) {
    return users.map((user) => ({
      id: user.id,
      full_name: user.getFullName(),
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    }));
  }

  static item(user: User) {
    const posts = PostsSerializer.list(user.posts);

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      full_name: user.getFullName(),
      email: user.email,
      role: user.role,
      posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    };
  }

  static forPost(user: User) {
    const posts = PostsSerializer.kv(user.posts);

    return {
      id: user.id,
      full_name: user.getFullName(),
      email: user.email,
      role: user.role,
      posts
    };
  }
}
