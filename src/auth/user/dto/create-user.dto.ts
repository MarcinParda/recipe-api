import { OmitType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorators';
import { UpdateUserDTO } from './update-user.dto';

export class CreateUsertDTO extends OmitType(UpdateUserDTO, ['id'] as const) {
  @IsString()
  @Match<CreateUsertDTO>('password')
  confirmPassword: string;
}
