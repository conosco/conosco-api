import { Module } from '@nestjs/common';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';

@Module({
    imports: [TypeOrmModule.forFeature([Group])],
    providers: [GroupService],
    exports: [GroupService]
})
export class GroupModule { }
