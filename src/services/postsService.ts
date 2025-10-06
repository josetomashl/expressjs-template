import { AppDataSource } from '../database/data-source';
import { PostEntity } from '../database/entities/Post';
import { InMemoryCache } from '../utils/cache';
import type { IPaginationParams } from '../utils/pagination';

export class PostsService {
  private static postsRepository = AppDataSource.getRepository(PostEntity);
  private static cache = new InMemoryCache<PostEntity[]>();

  static async getAll() {
    let list = this.cache.get('posts-list');
    if (!list) {
      // console.log('getting list from user repo');
      list = await this.postsRepository.find();
      this.cache.set('posts-list', list);
    }
    return list;
  }

  static async getPaginated({ offset, limit, sort, order }: IPaginationParams) {
    return await this.postsRepository.findAndCount({ take: limit, skip: offset, order: { [sort]: order } });
  }

  static async getById(id: string) {
    return await this.postsRepository.findOneBy({ id });
  }
}
