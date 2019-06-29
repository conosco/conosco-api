import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { Messages } from '@kl/consts/messages/messages.portuguese';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async findOne(id: number) {
    const habit = await this.habitRepository.findOneOrFail(id);
    return habit;
  }

  async findAll() {
      const habits = await this.habitRepository.find();
      if (await habits.length == 0 ){
        throw new NotFoundException(Messages.error.NOT_FOUND);
      }
      return habits;
  }
}
