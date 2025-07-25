import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';

@Controller('blog')
export class BlogController {
    // eslint-disable-next-line no-unused-vars
      constructor(private readonly blogService: BlogService) {}
    
      @Get()
      findall() {
        return this.blogService.findAll();
      }
    
      @Post()
      create(@Body() data: Partial<Blog>) {
        return this.blogService.create(data);
      }
    
      @Put(':id')
      update(@Param('id') id: string, @Body() data: Partial<Blog>) {
        return this.blogService.update(Number(id), data);
      }
    
      @Delete(':id')
      delete(@Param('id') id: string) {
        return this.blogService.delete(Number(id));
      }
}
