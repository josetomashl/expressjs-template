import { ILike } from 'typeorm';

import { Tag } from 'src/database/entities/Tag';
import { User } from 'src/database/entities/User';
import { AppDataSource } from '../database/data-source';
import { Post, PostStatusEnum } from '../database/entities/Post';
import { InMemoryCache } from '../utils/cache';
import type { IPaginationParams } from '../utils/pagination';

export class PostsService {
  private static postsRepository = AppDataSource.getRepository(Post);
  private static cache = new InMemoryCache<Post[]>();

  static async getAll() {
    let list = this.cache.get('posts-list');
    if (!list) {
      list = await this.postsRepository.find();
      this.cache.set('posts-list', list);
    }
    return list;
  }

  static async getPaginated({ offset, limit, sort, order, search }: IPaginationParams) {
    return await this.postsRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
      where: { title: ILike(search) },
      withDeleted: true
    });
  }

  static async getById(id: string) {
    return await this.postsRepository.findOne({
      where: { id },
      withDeleted: true
    });
  }

  static async getByTitle(title: string) {
    return await this.postsRepository.findOne({
      where: { title },
      withDeleted: true
    });
  }

  static async create(title: string, content: string, status: PostStatusEnum, tags: Tag[], user: User) {
    return await this.postsRepository.save({ title, content, status, tags, user });
  }

  static async update(post: Post) {
    return await this.postsRepository.save(post);
  }

  static async softRemove(post: Post) {
    return await this.postsRepository.softRemove(post);
  }

  static async recover(post: Post) {
    return await this.postsRepository.recover(post);
  }

  static async remove(post: Post) {
    return await this.postsRepository.remove(post);
  }
}
