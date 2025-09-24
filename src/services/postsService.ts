import type { Post } from 'src/models/Post';
import { PostsRepository } from '../repositories/postsRepository';
import { InMemoryCache } from '../utils/cache';

export class PostsService {
  private static cache = new InMemoryCache<Post[]>();

  static async getAll() {
    let list = this.cache.get('posts-list');
    if (!list) {
      // console.log('getting list from user repo');
      list = await PostsRepository.findAll();
      this.cache.set('posts-list', list);
    }
    return list;
  }

  static async getPaginated(page: number, limit: number) {
    return await PostsRepository.findPaginated(page, limit);
  }
}
