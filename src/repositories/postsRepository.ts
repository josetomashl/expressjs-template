import { pool } from '../configs/database';
import type { Pagination } from '../models/Pagination';
import type { Post } from '../models/Post';

export class PostsRepository {
  static async findAll(): Promise<Post[]> {
    const [rows] = await pool.query<Post[]>('SELECT * FROM posts;');
    return rows;
  }

  static async findPaginated(page: number, limit: number): Promise<Pagination<Post>> {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query<Post[]>(
      'SELECT *, (SELECT COUNT(*) FROM posts) AS total FROM posts LIMIT ? OFFSET ?;',
      [limit, offset]
    );
    const total = rows.length > 0 ? rows[0].total : 0;

    return { items: rows, limit, total, page, totalPages: Math.ceil(total / limit) };
  }
}
