import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { Messages } from '../../consts/messages/messages.portuguese';
import { HabitDTO } from './dto/habit.dto';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async create(habitDTO: HabitDTO) {
    const habit = await this.habitRepository.create(habitDTO);
    await habit.save();
    return habit;
  }

  async findByIds(habits: Habit[]) {
    const habitsArray = await this.habitRepository.findByIds(habits);
    if (await habitsArray.length === 0 ){
      throw new NotFoundException(Messages.error.NOT_FOUND);
    }
    return habitsArray;
  }

  async findOne(id: number) {
    const habit = await this.habitRepository.findOneOrFail(id);
    return habit;
  }

  async findAll() {
      const habits = await this.habitRepository.find();
      if (await habits.length === 0 ){
        throw new NotFoundException(Messages.error.NOT_FOUND);
      }
      return habits;
  }
}
