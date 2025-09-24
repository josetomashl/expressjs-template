import type { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  role: 'SUPER' | 'ADMIN' | 'USER';
  is_removed: boolean;
  created_at: Date;
  modified_at: Date | null;
}
