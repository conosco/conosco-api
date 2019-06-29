import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';

@Module({
  providers: [HabitService],
  controllers: [HabitController],
})
export class HabitModule {}
