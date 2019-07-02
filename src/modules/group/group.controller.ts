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
import { GroupService } from './group.service';
import { AuthGuard } from '@nestjs/passport';
import { Messages } from '../../consts/messages/messages.portuguese';
import { TopicDTO } from '../topic/dto/topic.dto';
import { GroupDTO } from './dto/group.dto';
import { ResponseTransformInterceptor } from '../../common/filters/response.pipe';

@ApiUseTags('groups')
// @ApiBearerAuth()
@Controller('groups')
@UseInterceptors(ResponseTransformInterceptor)
// @UseGuards(AuthGuard())
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async findAll() {
    const groups = await this.groupService.findAll();
    return await { message: Messages.success.GROUPS_FIND_ALL_SUCESS, data: groups };
  }

  @Post()
  async create(@Body() groupDTO: GroupDTO) {
    const group = await this.groupService.create(groupDTO);
    return {
      message: Messages.success.GROUP_SAVE_SUCESS,
      data: group,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const group = await this.groupService.findOne(id);
    return { message: Messages.success.GROUP_FIND_ONE_SUCESS, data: group };
  }

  @Get(':id/users')
  async findUsers(@Param('id') id: number) {
    const group = await this.groupService.findUsers(id);
    return {
      message: Messages.success.GROUP_FIND_USERS_SUCESS,
      data: group,
    };
  }

  @Post(':id/subscribe/:userId')
  async subscribeUser(@Param('id') id: number, @Param('userId') userId: number) {
    const subscribedUser = await this.groupService.subscribeUser(id, userId);
    return {
      message: Messages.success.GROUP_FIND_USERS_SUCESS,
      data: subscribedUser,
    };
  }

  @Delete(':id/unsubscribe/:userId')
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

  @Get(':id/topics')
  async findTopics(@Param('id') id: number) {
    const group = await this.groupService.findTopics(id);
    return {
      message: Messages.success.GROUP_FIND_TOPICS_SUCESS,
      data: group,
    };
  }

  @Get(':id/habits')
  async findHabits(@Param('id') id: number) {
    const group = await this.groupService.findHabits(id);
    return {
      message: 'Habitos encontrados com sucesso',
      data: group,
    };
  }

  @Post(':id/topics')
  async createTopic(@Param('id') id: number, @Body() topicDTO: TopicDTO) {
    const topic = await this.groupService.createTopic(id, topicDTO);
    return {
      message: Messages.success.GROUP_FIND_USERS_SUCESS,
      data: topic,
    };
  }
}