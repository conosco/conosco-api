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
import { Messages } from '@kl/consts/messages/messages.portuguese';

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
    return { message: Messages.success.GROUPS_FIND_ALL_SUCESS, data: groups };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const group = await this.groupService.findOne(id);
    return { message: Messages.success.GROUP_FIND_ONE_SUCESS, data: group };
  }

  @Get(':id/habits')
  async habits(@Param('id') id: number) {
    const group = await this.groupService.findHabits(id);
    return {
      message: 'Habitos encontrados com sucesso',
      data: group,
    };
  }

  @Get(':id/users')
  async users(@Param('id') id: number) {
    const group = await this.groupService.findUsers(id);
    return {
      message: Messages.success.GROUP_FIND_USERS_SUCESS,
      data: group,
    };
  }

  @Post(':id/join/:userId')
  async joinGroup(@Param('id') id: number, @Param('userId') userId: number) {
    const subscribedUser = this.groupService.subscribeUser(id, userId);
    return {
      message: Messages.success.GROUP_FIND_USERS_SUCESS,
      data: subscribedUser,
    };
  }

  @Delete(':id/leave/:userId')
  async leaveGroup(@Param('id') id: number, @Param('userId') userId: number) {
    const unsubscribedUser = await this.groupService.unsubscribeUser(
      id,
      userId,
    );
    return {
      message: Messages.success.GROUP_UNSUBSCRIBE_USER_SUCESS,
      data: unsubscribedUser,
    };
  }
}
