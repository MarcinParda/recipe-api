import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
