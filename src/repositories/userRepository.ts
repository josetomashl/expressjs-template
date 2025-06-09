import { pool } from '../configs/database';
import type { User } from '../models/User';

export class UserRepository {
  static async findAll(): Promise<User[]> {
    const [rows] = await pool.query<User[]>('SELECT * FROM user WHERE is_removed = false;');
    return rows;
  }
}
