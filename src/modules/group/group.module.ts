import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { UserModule } from '../user/user.module';
import { TopicModule } from '../topic/topic.module';
import { PassportModule } from '@nestjs/passport';
import { HabitModule } from '../habit/habit.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule, TopicModule, HabitModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
