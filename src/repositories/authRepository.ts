import { randomUUID } from 'node:crypto';
import { pool } from '../configs/database';
import type { User } from '../models/User';

export class AuthRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<User[]>('SELECT * FROM user WHERE email = ? AND is_removed = false LIMIT 1;', [
      email
    ]);
    return rows.length ? rows[0] : null;
  }

  static async create(username: string, email: string, password: string): Promise<User | null> {
    const uuid = randomUUID();
    await pool.query('INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?);', [
      uuid,
      username,
      email,
      password
    ]);
    return await this.findByEmail(email);
  }
}
