import type { Request, Response } from 'express';

import { TagsSerializer } from '../serializers/tagsSerializer';
import { TagsService } from '../services/tagsService';
import { getPaginationParams } from '../utils/pagination';
import { SendResponse } from '../utils/response';

export class TagsController {
  static async getAll(_req: Request, res: Response) {
    const tags = await TagsService.getAll();

    return SendResponse.success(res, TagsSerializer.kv(tags));
  }

  static async getPaginated(req: Request, res: Response) {
    const params = getPaginationParams(req.query);
    const [items, total] = await TagsService.getPaginated(params);

    return SendResponse.success(res, { items: TagsSerializer.list(items), total });
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Tag ID not provided.');
    }

    const tag = await TagsService.getById(id);
    if (!tag) {
      return SendResponse.notFound(res, 'Tag');
    }

    return SendResponse.success(res, TagsSerializer.item(tag));
  }

  static async create(req: Request, res: Response) {
    const { name, description } = req.body;
    const previousTag = await TagsService.getByName(name);
    if (previousTag) {
      return SendResponse.badRequest(res, `Tag with name "${name}" already exists`);
    }

    const tag = await TagsService.create(name, description);

    return SendResponse.success(res, TagsSerializer.item(tag));
  }

  static async update(req: Request, res: Response) {
    const { name, description } = req.body;
    const previousTag = await TagsService.getByName(name);
    if (!previousTag) {
      return SendResponse.notFound(res, 'Tag');
    }

    if (previousTag.name !== name) {
      previousTag.name = name;
    }

    if (previousTag.description !== description) {
      previousTag.description = description;
    }

    const tag = await TagsService.update(previousTag);

    return SendResponse.success(res, TagsSerializer.item(tag));
  }

  static async softRemove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Tag ID not provided.');
    }

    let tag = await TagsService.getById(id);
    if (!tag) {
      return SendResponse.notFound(res, 'Tag');
    }

    if (tag.deletedAt) {
      tag = await TagsService.recover(tag);
    } else {
      tag = await TagsService.softRemove(tag);
    }

    return SendResponse.success(res, TagsSerializer.item(tag));
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Tag ID not provided.');
    }

    const tag = await TagsService.getById(id);
    if (!tag) {
      return SendResponse.notFound(res, 'Tag');
    }

    await TagsService.remove(tag);

    return SendResponse.success(res, null);
  }
}
