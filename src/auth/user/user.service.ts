import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUsertDTO } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(where: Partial<User>): Promise<User> {
    return this.userRepository.findOne({ where });
  }

  async create(
    user: Pick<CreateUsertDTO, 'email' | 'password'>,
  ): Promise<User> {
    return this.userRepository.save({
      email: user.email.trim().toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  async update(user: Partial<UpdateUserDTO>): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save({
      ...userToUpdate,
      ...user,
    });
  }
}
