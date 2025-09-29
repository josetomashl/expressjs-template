import { AppDataSource } from '../database/data-source';
import { UserEntity } from '../database/entities/User';
import { InMemoryCache } from '../utils/cache';
import type { IPaginationParams } from '../utils/pagination';

export class UsersService {
  private static usersRepository = AppDataSource.getRepository(UserEntity);
  private static cache = new InMemoryCache<UserEntity[]>();

  static async getAll() {
    let list = this.cache.get('users-list');
    if (!list) {
      list = await this.usersRepository.find();
      this.cache.set('users-list', list);
    }
    return list;
  }

  static async getPaginated({ offset, limit, sort, order }: IPaginationParams) {
    return await this.usersRepository.findAndCount({ take: limit, skip: offset, order: { [sort]: order } });
  }
}
