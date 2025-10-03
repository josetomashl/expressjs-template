import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { PostEntity } from './Post';

export enum RolesEnum {
  ADMIN = 'admin',
  SUPER = 'super',
  USER = 'user'
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER
  })
  role!: RolesEnum;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts!: PostEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  getFullName(): string {
    return this.name + ' ' + this.surname;
  }
}
