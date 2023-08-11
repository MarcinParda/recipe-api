import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDishDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  @IsOptional()
  servings?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
