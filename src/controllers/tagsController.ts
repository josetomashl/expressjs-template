import type { Request, Response } from 'express';

import type { CreateTagDTO, UpdateTagDTO } from '../constraints/tagContraints';
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
    const payload = { ...req.body } as CreateTagDTO;

    const sameNameTag = await TagsService.getByName(payload.name);
    if (sameNameTag) {
      return SendResponse.badRequest(res, `Tag with name "${payload.name}" already exists.`);
    }

    const tag = await TagsService.create(payload);

    return SendResponse.success(res, TagsSerializer.item(tag));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'Tag ID not provided.');
    }
    const originalTag = await TagsService.getById(id);
    if (!originalTag) {
      return SendResponse.notFound(res, 'Tag');
    }
    const { name, description } = req.body as UpdateTagDTO;
    const sameNameTag = await TagsService.getByName(name);
    if (sameNameTag) {
      return SendResponse.badRequest(res, `Tag with name "${name}" already exists.`);
    }

    if (originalTag.name !== name) {
      originalTag.name = name;
    }

    if (originalTag.description !== description) {
      originalTag.description = description;
    }

    const tag = await TagsService.update(originalTag);

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
