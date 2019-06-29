import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';

@Injectable()
export class HabitService {
 constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    ) {}

findOne(id: number) {
    throw new Error('Method not implemented.');
}
findAll() {
    throw new Error('Method not implemented.');
}
}
