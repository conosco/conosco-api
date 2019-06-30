import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Topic } from '../topic/topic.entity';
import { Habit } from '../habit/habit.entity';

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

  @OneToMany(() => Topic, (topic: Topic) => topic.group)
  topics: Topic[];

  @ManyToMany(() => Habit, habit => habit.groups, {eager: true})
  @JoinTable({
    name: 'group_habit',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'habit_id',
      referencedColumnName: 'id',
    },
  })
  habits: Habit[];
}
