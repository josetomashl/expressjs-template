import { ILike } from 'typeorm';

import type { CreateUserDTO } from '../constraints/userContraints';
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

  static async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      withDeleted: true
    });
  }

  static async create(data: CreateUserDTO) {
    return await this.usersRepository.save({ ...data });
  }

  static async update(tag: User) {
    return await this.usersRepository.save(tag);
  }

  static async softRemove(tag: User) {
    return await this.usersRepository.softRemove(tag);
  }

  static async recover(tag: User) {
    return await this.usersRepository.recover(tag);
  }

  static async remove(tag: User) {
    return await this.usersRepository.remove(tag);
  }
}
