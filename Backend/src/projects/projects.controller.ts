import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectsDto } from './dto/create-projects.dto';

@Controller('projects')
export class ProjectsController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findall() {
    return this.projectsService.findAll();
  }

  @Post()
  create(@Body() data: CreateProjectsDto) {
    return this.projectsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateProjectsDto>) {
    return this.projectsService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(Number(id));
  }
}
