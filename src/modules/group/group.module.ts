import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { UserModule } from '../user/user.module';
import { TopicService } from '../topic/topic.service';
import { TopicModule } from '../topic/topic.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule, TopicModule],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
