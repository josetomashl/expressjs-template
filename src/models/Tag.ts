import type { RowDataPacket } from 'mysql2/promise';

export interface Tag extends RowDataPacket {
  id: string;
  name: string;
}
