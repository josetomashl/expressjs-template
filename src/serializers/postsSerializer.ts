import type { Post } from '../database/entities/Post';
import { TagsSerializer } from './tagsSerializer';
import { UsersSerializer } from './usersSerializer';

export class PostsSerializer {
  static kv(posts: Post[]) {
    return posts.map((post) => ({
      id: post.id,
      title: post.title
    }));
  }

  static list(posts: Post[]) {
    return posts.map((post) => {
      const tags = TagsSerializer.kv(post.tags);

      return {
        id: post.id,
        title: post.title,
        tags,
        status: post.status,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt
      };
    });
  }

  static item(post: Post) {
    const user = UsersSerializer.forPost(post.user);
    const tags = TagsSerializer.kv(post.tags);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      tags,
      status: post.status,
      user,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt
    };
  }
}
