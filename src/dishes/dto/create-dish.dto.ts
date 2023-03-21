import { OmitType } from '@nestjs/mapped-types';
import { UpdateDishDTO } from './update-dish.dto';

export class CreateDishDTO extends OmitType(UpdateDishDTO, ['id'] as const) {}
