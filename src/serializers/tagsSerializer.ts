import type { TagEntity } from '../database/entities/Tag';

export class TagsSerializer {
  static kv(tags: TagEntity[]) {
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name
    }));
  }

  static list(tags: TagEntity[]) {
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      deletedAt: tag.deletedAt
    }));
  }
}
