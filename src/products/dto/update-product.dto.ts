import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  unit: 'kg' | 'g' | 'l' | 'ml' | 'tsp' | 'sp' | 'pinch' | 'item';

  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @IsNumber()
  dishId: number;
}
