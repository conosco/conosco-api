import {
  Controller,
  UseInterceptors,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from '@kl/common/pipes/interceptors/response.pipe';
import { UserService } from '../user/user.service';
import { GroupService } from './group.service';
import { SubscriptionDTO } from './dto/group.subscription.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('groups')
@ApiBearerAuth()
@Controller('groups')
@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(AuthGuard())
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async findAll() {
    const groups = await this.groupService.findAll();
    return groups;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const group = await this.groupService.findOne(id);
    return group;
  }

  @Get(':id/users')
  async users(@Param('id') id: number) {
    return this.groupService.findUsers(id);
  }

  @Post(':id/join/:userId')
  async joinGroup(@Param('id') id: number, @Param('userId') userId: number) {
    const groupWithUser = await this.groupService.subscribeUser(id, userId);
    return groupWithUser;
  }

  @Delete(':id/leave/:userId')
  async leaveGroup(@Param('id') id: number, @Param('userId') userId: number) {
    return this.groupService.unsubscribeUser(id, userId);
  }
}
