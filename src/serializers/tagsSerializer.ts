import { Tag } from '../database/entities/Tag';

export class TagsSerializer {
  static kv(tags: Tag[]) {
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name
    }));
  }

  static list(tags: Tag[]) {
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      deletedAt: tag.deletedAt
    }));
  }

  static item(tag: Tag) {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      deletedAt: tag.deletedAt
    };
  }
}
