import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { HttpErrorFilter } from '../../common/exceptions/http-error-filter';
import { LoginDTO } from '../auth/dto/auth.login.dto';
import { PayloadDTO } from '../auth/dto/auth.payload.dto';
import { RegisterDTO } from '../auth/dto/auth.register.dto';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

// {nome: "joao", email: "123@123.com"}
  async create(user: RegisterDTO): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ email });
  }

  async findByPayload(payload: PayloadDTO) {
    const { username } = payload;
    return await this.userRepository.findOne({ username });
  }

  async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userRepository.findOneOrFail({ email });
    if (password.includes(user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  sanitizeUser(user: User) {
    return { email: user.email };
  }
}