import { compare } from 'bcrypt';
import type { Request, Response } from 'express';

import { CreateUserDTO, UpdateUserDTO } from '../constraints/userContraints';
import { UsersSerializer } from '../serializers/usersSerializer';
import { UsersService } from '../services/usersService';
import { hashPassword } from '../utils/crypto';
import { getPaginationParams } from '../utils/pagination';
import { SendResponse } from '../utils/response';

export class UsersController {
  static async getAll(_req: Request, res: Response) {
    const users = await UsersService.getAll();

    res.json(UsersSerializer.kv(users));
  }

  static async getPaginated(req: Request, res: Response) {
    const params = getPaginationParams(req.query);
    const [items, total] = await UsersService.getPaginated(params);

    res.json({ items: UsersSerializer.list(items), total });
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'User ID not provided.');
    }

    const user = await UsersService.getById(id);
    if (!user) {
      return SendResponse.notFound(res, 'User');
    }

    return SendResponse.success(res, UsersSerializer.item(user));
  }

  static async create(req: Request, res: Response) {
    const payload = { ...req.body } as CreateUserDTO;

    const previousUser = await UsersService.getByEmail(payload.email);
    if (previousUser) {
      return SendResponse.badRequest(res, `User with email "${payload.email}" already exists.`);
    }

    const hashedPassword = await hashPassword(payload.password);

    const user = await UsersService.create({ ...payload, password: hashedPassword });

    return SendResponse.success(res, UsersSerializer.item(user));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'User ID not provided.');
    }

    const previousUser = await UsersService.getById(id);
    if (!previousUser) {
      return SendResponse.notFound(res, 'User');
    }

    const { name, surname, email, password, role } = req.body as UpdateUserDTO;

    if (email && previousUser.email !== email) {
      const sameEmailUser = await UsersService.getByEmail(email);
      if (sameEmailUser) {
        return SendResponse.badRequest(res, `User with email "${email}" already exists.`);
      }

      previousUser.email = email;
    }

    if (password && !(await compare(password, previousUser.password))) {
      previousUser.password = await hashPassword(password);
    }

    if (name && previousUser.name !== name) {
      previousUser.name = name;
    }

    if (surname && previousUser.surname !== surname) {
      previousUser.surname = surname;
    }

    if (role && previousUser.role !== role) {
      previousUser.role = role;
    }

    const user = await UsersService.update(previousUser);

    return SendResponse.success(res, UsersSerializer.item(user));
  }

  static async softRemove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'User ID not provided.');
    }

    let user = await UsersService.getById(id);
    if (!user) {
      return SendResponse.notFound(res, 'User');
    }

    if (user.deletedAt) {
      user = await UsersService.recover(user);
    } else {
      user = await UsersService.softRemove(user);
    }

    return SendResponse.success(res, UsersSerializer.item(user));
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return SendResponse.badRequest(res, 'User ID not provided.');
    }

    const user = await UsersService.getById(id);
    if (!user) {
      return SendResponse.notFound(res, 'User');
    }

    await UsersService.remove(user);

    return SendResponse.success(res, null);
  }
}
