import type { PostEntity } from '@/database/entities/Post';
import { TagsSerializer } from './tagsSerializer';
import { UserSerializer } from './usersSerializer';

export class PostsSerializer {
  static kv(posts: PostEntity[]) {
    return posts.map((post) => ({
      id: post.id,
      title: post.title
    }));
  }

  static list(posts: PostEntity[]) {
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

  static item(post: PostEntity) {
    const user = UserSerializer.forPost(post.user);
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
