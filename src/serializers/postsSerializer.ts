import type { Post } from '../models/Post';

export class PostsSerializer {
  static kv(posts: Post[]) {
    return posts.map((post) => ({
      id: post.id,
      title: post.title
    }));
  }

  static list(posts: Post[]) {
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      tags: post.tags,
      status: post.status,
      created_at: post.created_at
    }));
  }

  static item(post: Post) {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author,
      tags: post.tags,
      status: post.status,
      is_removed: post.is_removed,
      created_at: post.created_at,
      modified_at: post.modified_at
    };
  }
}
