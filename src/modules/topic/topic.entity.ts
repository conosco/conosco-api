import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Group } from '../group/group.entity';

@Entity('topic')
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: '255' })
  title: string;

  @Column({ name: 'text', type: 'text' })
  text: string;

  @Column({ name: 'image_url', type: 'varchar', length: '255', nullable: true })
  imageUrl: string;

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

  @ManyToOne(type => User, user => user.topics)
  user: User;

  @ManyToOne(type => Group, group => group.topics)
  group: Group;
}
