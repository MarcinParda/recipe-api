import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDishDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  servings: number;

  @IsString()
  @IsOptional()
  description?: string;
}
