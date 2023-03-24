import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsertDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateUsertDTO) {
    // TODO: validate data
    return this.authService.register(user);
  }
}
