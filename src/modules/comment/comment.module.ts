import { Module } from '@nestjs/common';
import { Topic } from '../topic/topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Topic])] })
export class CommentModule {}
