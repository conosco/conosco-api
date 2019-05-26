import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Group } from '../group/group.entity';
import { Reward } from '../reward/reward.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  lastName: string;

  @Column({ type: 'varchar', length: '255', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: '255', nullable: true, select: false })
  password: string;

  @Column({
    name: 'facebook_token',
    type: 'varchar',
    length: '255',
    unique: true,
    nullable: true,
  })
  facebookToken: string;

  @Column({
    name: 'profile_pic',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  profilePic: string;

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

  @ManyToMany(type => Group, group => group.users)
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Group[];

  @ManyToMany(type => Reward, reward => reward.users)
  @JoinTable({
    name: 'user_reward',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'reward_id',
      referencedColumnName: 'id',
    },
  })
  rewards: Reward[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}
