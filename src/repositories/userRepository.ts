import { pool } from '../configs/database';
import type { Pagination } from '../models/Pagination';
import type { User } from '../models/User';

export class UserRepository {
  static async findAll(): Promise<User[]> {
    const [rows] = await pool.query<User[]>('SELECT * FROM user;');
    return rows;
  }

  static async findPaginated(page: number, limit: number): Promise<Pagination<User>> {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query<User[]>(
      'SELECT *, (SELECT COUNT(*) FROM user) AS total FROM user LIMIT ? OFFSET ?;',
      [limit, offset]
    );
    const total = rows.length > 0 ? rows[0].total : 0;

    return { items: rows, limit, total, page, totalPages: Math.ceil(total / limit) };
  }
}
