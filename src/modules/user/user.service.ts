import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { User } from './user.entity';
import { LoginDTO } from '../auth/dto/auth.login-email.dto';
import { RegisterDTO } from '../auth/dto/auth.register.dto';
import { Messages } from '../../consts/messages/messages.portuguese';

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
    const data = await this.userRepository.create(registerDto);
    try {
      const user = await this.userRepository.save(data);
      return user;
    } catch (error) {
      throw new ConflictException(Messages.error.USER_ALREADY_EXISTS);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ email });
  }

  async getUserWithPassword(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginDTO.email })
      .getOne();
    return user;
  }
}
