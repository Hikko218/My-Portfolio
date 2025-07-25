import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    // eslint-disable-next-line no-unused-vars
    private blogRepo: Repository<Blog>,
  ) {}

  // Returns all blog posts ordered by ID
  async findAll() {
    try {
      return await this.blogRepo.find({ order: { id: 'ASC' } });
    } catch {
      // Throws if there is a problem loading blog posts
      throw new BadRequestException('Error loading blog posts');
    }
  }

  // Creates a new blog post
  async create(data: Partial<Blog>) {
    try {
      return await this.blogRepo.save(data);
    } catch {
      // Throws if blog post creation fails
      throw new BadRequestException('Blog post could not be created');
    }
  }

  // Updates an existing blog post by ID
  async update(id: number, data: Partial<Blog>) {
    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) {
      // Throws if blog post is not found
      throw new NotFoundException('Blog post not found');
    }
    try {
      await this.blogRepo.update({ id }, data);
      return await this.blogRepo.findOne({ where: { id } });
    } catch {
      // Throws if blog post update fails
      throw new BadRequestException('Blog post could not be updated');
    }
  }

  // Deletes a blog post by ID
  async delete(id: number) {
    const blog = await this.blogRepo.findOne({ where: { id } });
    if (!blog) {
      // Throws if blog post is not found
      throw new NotFoundException('Blog post not found');
    }
    try {
      await this.blogRepo.delete({ id });
      return { deleted: true };
    } catch {
      // Throws if blog post deletion fails
      throw new BadRequestException('Blog post could not be deleted');
    }
  }
}
