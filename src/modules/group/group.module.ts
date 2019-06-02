import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserModule],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
