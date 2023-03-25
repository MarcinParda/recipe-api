import { Injectable } from '@nestjs/common';
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

  async update(id: number, props: Partial<UpdateUserDTO>) {
    const user = await this.userRepository.preload({
      id,
      ...props,
    });
    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }

    return this.userRepository.save(user);
  }
}
