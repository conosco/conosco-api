import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './user.entity';
import { LoginDTO } from '../auth/dto/auth.login-email.dto';
import { RegisterDTO } from '../auth/dto/auth.register.dto';
import * as bcrypt from 'bcrypt';

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

  async validateLogin(userDTO: LoginDTO) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email: userDTO.email })
      .getOne();

    if (user == null) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isValid = await bcrypt.compareSync(userDTO.password, user.password);

    if (await isValid) {
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
