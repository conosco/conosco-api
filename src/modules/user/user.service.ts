import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDTO } from '../auth/dto/auth.login-email.dto';
import { RegisterDTO } from '../auth/dto/auth.register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(registerDto: RegisterDTO): Promise<User> {
    const user = await this.userRepository.create(registerDto);
    await this.userRepository.save(user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ email });
  }

  async getUserWithPassword(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email: loginDTO.email })
      .getOne();
    return user;
  }
}
