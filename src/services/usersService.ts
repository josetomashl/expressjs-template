import type { User } from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import { InMemoryCache } from '../utils/cache';

export class UsersService {
  private static cache = new InMemoryCache<User[]>();

  static async getAll() {
    let list = this.cache.get('users-list');
    if (!list) {
      // console.log('getting list from user repo');
      list = await UserRepository.findAll();
      this.cache.set('users-list', list);
    }
    return list;
  }

  static async getPaginated(page: number, limit: number) {
    return await UserRepository.findPaginated(page, limit);
  }
}
