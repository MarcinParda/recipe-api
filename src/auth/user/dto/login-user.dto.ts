import { PickType } from '@nestjs/mapped-types';
import { UpdateUserDTO } from './update-user.dto';

export class LoginUsertDTO extends PickType(UpdateUserDTO, [
  'email',
  'password',
] as const) {}
