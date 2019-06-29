import { Controller, UseInterceptors, UseGuards, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from '@kl/common/filters/response.pipe';
import { AuthGuard } from '@nestjs/passport';
import { HabitService } from './habit.service';
import { Messages } from '@kl/consts/messages/messages.portuguese';

@ApiUseTags('habit')
@ApiBearerAuth()
@Controller('habit')
@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(AuthGuard())
export class HabitController {
    constructor(private habitService: HabitService) {}

  @Get()
  async findAll() {
    const habits = await this.habitService.findAll();
    return { message: Messages.success.HABIT_FIND_ALL_SUCESS, data: habits };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const habit = await this.habitService.findOne(id);
    return { message: Messages.success.HABIT_FIND_ONE_SUCESS, data: habit };
  }
}
