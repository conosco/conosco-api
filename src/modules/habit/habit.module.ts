import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit])],
  providers: [HabitService],
  controllers: [HabitController],
  exports: [HabitService]
})
export class HabitModule {}
