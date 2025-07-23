import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skills } from './skills.entity';
import { CreateSkillsDto } from './dto/create-skills.dto';

@Controller('skills')
export class SkillsController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findall() {
    return this.skillsService.findAll();
  }

  @Post()
  create(@Body() data: CreateSkillsDto) {
    return this.skillsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Skills>) {
    return this.skillsService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.skillsService.delete(Number(id));
  }
}
