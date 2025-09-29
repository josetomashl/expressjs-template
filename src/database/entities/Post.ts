import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { TagEntity } from './Tag';
import { UserEntity } from './User';

export enum PostStatusEnum {
  DRAFT = 'draft',
  FINAL = 'final'
}

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  title!: string;

  @Column('text')
  content!: string;

  @Column({
    type: 'enum',
    enum: PostStatusEnum,
    default: PostStatusEnum.DRAFT
  })
  status!: PostStatusEnum;

  @ManyToOne(() => UserEntity, (user) => user.posts, { cascade: true })
  user!: UserEntity;

  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable()
  tags!: TagEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
