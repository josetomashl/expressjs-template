import type { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket {
  id: string;
  email: string;
  password: string;
  is_removed: boolean;
  created_at: Date;
  modified_at: Date | null;
}
