import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends BaseEntity {
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiModelProperty()
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  firstName: string;

  @IsString()
  @ApiModelProperty()
  @Column({
    name: 'last_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  lastName: string;

  @IsString()
  @ApiModelProperty()
  @Column({ type: 'varchar', length: '255', unique: true, nullable: false })
  email: string;

  @IsString()
  @Exclude()
  @Column({ type: 'varchar', length: '255', nullable: true })
  password: string;

  @IsString()
  @ApiModelProperty()
  @Column({
    name: 'facebook_token',
    type: 'varchar',
    length: '255',
    unique: true,
    nullable: true,
  })
  facebookToken: string;

  @IsString()
  @ApiModelProperty()
  @Column({
    name: 'profile_pic',
    type: 'varchar',
    length: '255',
    unique: true,
    nullable: true,
  })
  profilePic: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: string;
}
