import { IsString } from 'class-validator';

export class AboutDto {
  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  image: string;
}
