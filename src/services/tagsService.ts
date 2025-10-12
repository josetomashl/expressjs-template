import { ILike } from 'typeorm';

import type { CreateTagDTO } from '../constraints/tagContraints';
import { AppDataSource } from '../database/data-source';
import { Tag } from '../database/entities/Tag';
import { InMemoryCache } from '../utils/cache';
import type { IPaginationParams } from '../utils/pagination';

export class TagsService {
  private static tagsRepository = AppDataSource.getRepository(Tag);
  private static cache = new InMemoryCache<Tag[]>();

  static async getAll() {
    let list = this.cache.get('tags-list');
    if (!list) {
      list = await this.tagsRepository.find();
      this.cache.set('tags-list', list);
    }
    return list;
  }

  static async getPaginated({ offset, limit, sort, order, search }: IPaginationParams) {
    return await this.tagsRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { [sort]: order },
      where: { name: ILike(search) },
      withDeleted: true
    });
  }

  static async getById(id: string) {
    return await this.tagsRepository.findOne({
      where: { id },
      withDeleted: true
    });
  }

  static async getByName(name: string) {
    return await this.tagsRepository.findOne({
      where: { name },
      withDeleted: true
    });
  }

  static async create(data: CreateTagDTO) {
    return await this.tagsRepository.save(data);
  }

  static async update(tag: Tag) {
    return await this.tagsRepository.save(tag);
  }

  static async softRemove(tag: Tag) {
    return await this.tagsRepository.softRemove(tag);
  }

  static async recover(tag: Tag) {
    return await this.tagsRepository.recover(tag);
  }

  static async remove(tag: Tag) {
    return await this.tagsRepository.remove(tag);
  }
}
