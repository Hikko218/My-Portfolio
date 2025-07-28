import { IsString } from 'class-validator';

export class CreateProjectsDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  link: string;
}
