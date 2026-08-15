import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(params: {
    name: string;
    email: string;
    plainTextPassword: string;
  }): Promise<User> {
    const existingUser = await this.findByEmail(params.email);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario registrado con este email');
    }

    const passwordHash = await bcrypt.hash(params.plainTextPassword, SALT_ROUNDS);

    const newUser = this.usersRepository.create({
      name: params.name,
      email: params.email,
      passwordHash,
    });

    return this.usersRepository.save(newUser);
  }

  async validatePassword(
    plainTextPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, passwordHash);
  }
}