import { pool } from '../configs/database';
import type { User } from '../models/User';

export class AuthRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<User[]>('SELECT * FROM user WHERE email = ? AND is_removed = false LIMIT 1;', [
      email
    ]);
    return rows.length ? rows[0] : null;
  }

  static async create(user: { email: string; password: string }): Promise<User | null> {
    const [rows] = await pool.query<User[]>('INSERT INTO user (email, password) VALUES (?, ?);', [
      user.email,
      user.password
    ]);
    return rows.length ? rows[0] : null;
  }
}
