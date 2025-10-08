import { ILike } from 'typeorm';

import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/User';
import { InMemoryCache } from '../utils/cache';
import type { IPaginationParams } from '../utils/pagination';

export class UsersService {
  private static usersRepository = AppDataSource.getRepository(User);
  private static cache = new InMemoryCache<User[]>();

  static async getAll() {
    let list = this.cache.get('users-list');
    if (!list) {
      list = await this.usersRepository.find();
      this.cache.set('users-list', list);
    }
    return list;
  }

  static async getPaginated({ offset, limit, sort, order, search }: IPaginationParams) {
    return await this.usersRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
      where: [{ name: ILike(search) }, { email: ILike(search) }],
      withDeleted: true
    });
  }

  static async getById(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      withDeleted: true
    });
  }
}
