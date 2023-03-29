import { IsNumber, IsString } from 'class-validator';

export class UpdateDishDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  servings: number;

  @IsString()
  description?: string;
}
