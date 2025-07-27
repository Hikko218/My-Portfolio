import { IsString, IsNotEmpty } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
