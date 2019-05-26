import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('group')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: '255' })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: '255' })
  description: string;

  @Column({ name: 'icon_url', type: 'varchar', length: '255' })
  iconUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    select: false,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    select: false,
  })
  updatedAt: string;

  @ManyToMany(type => User, user => user.groups)
  users: User[];
}
