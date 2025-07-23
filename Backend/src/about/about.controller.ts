import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from './about.entity';

@Controller('about')
export class AboutController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly aboutService: AboutService) {}
  @Get()
  findall() {
    return this.aboutService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<About>) {
    return this.aboutService.update(Number(id), data);
  }
}
