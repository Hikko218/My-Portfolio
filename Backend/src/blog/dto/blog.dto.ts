import { IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
