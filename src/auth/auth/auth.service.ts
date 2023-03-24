import { Injectable } from '@nestjs/common';
import { CreateUsertDTO } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(user: Pick<CreateUsertDTO, 'email' | 'password'>) {
    return this.userService.create(user);
  }
}
