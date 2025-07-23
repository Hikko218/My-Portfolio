import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateSkillsDto {
  @IsString()
  skill: string;

  @IsInt()
  @Min(0)
  @Max(100)
  level: number;
}
