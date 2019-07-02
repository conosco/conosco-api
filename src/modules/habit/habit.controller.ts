import { Controller, UseInterceptors, UseGuards, Get, Param, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseTransformInterceptor } from '../../common/filters/response.pipe';
import { AuthGuard } from '@nestjs/passport';
import { HabitService } from './habit.service';
import { Messages } from '../../consts/messages/messages.portuguese';
import { HabitDTO } from './dto/habit.dto';

@ApiUseTags('habit')
// @ApiBearerAuth()
@Controller('habit')
@UseInterceptors(ResponseTransformInterceptor)
// @UseGuards(AuthGuard())
export class HabitController {
    constructor(private habitService: HabitService) {}

    @Post()
    async create(@Body() habitDTO: HabitDTO) {
      const group = await this.habitService.create(habitDTO);
      return {
        message: Messages.success.GROUP_SAVE_SUCESS,
        data: group,
      };
    }

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
