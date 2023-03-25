import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
