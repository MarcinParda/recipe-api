import { OmitType } from '@nestjs/mapped-types';
import { UpdateUserDTO } from './update-user.dto';

export class CreateUsertDTO extends OmitType(UpdateUserDTO, ['id'] as const) {}
