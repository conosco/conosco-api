import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  firstName: string;

  @IsString()
  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  lastName: string;

  @IsString()
  @Column({ type: 'varchar', length: '255', unique: true, nullable: false })
  email: string;

  @IsString()
  @Column({ type: 'varchar', length: '255', nullable: true, select: false })
  password: string;

  @IsString()
  @Column({
    name: 'facebook_token',
    type: 'varchar',
    length: '255',
    unique: true,
    nullable: true,
  })
  facebookToken: string;

  @IsString()
  @Column({
    name: 'profile_pic',
    type: 'varchar',
    length: '255',
    unique: true,
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

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}
