import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    // eslint-disable-next-line no-unused-vars
    private aboutRepo: Repository<About>,
  ) {}

  // Returns all about entries ordered by ID
  async findAll() {
    try {
      return await this.aboutRepo.find({ order: { id: 'ASC' } });
    } catch {
      // Throws if there is a problem loading about entries
      throw new BadRequestException('Error loading about entries');
    }
  }

  // Updates an existing about entry by ID
  async update(id: number, data: Partial<About>) {
    const about = await this.aboutRepo.findOne({ where: { id } });
    if (!about) {
      // Throws if about entry is not found
      throw new NotFoundException('About entry not found');
    }
    try {
      await this.aboutRepo.update({ id }, data);
      return await this.aboutRepo.findOne({ where: { id } });
    } catch {
      // Throws if about entry update fails
      throw new BadRequestException('About entry could not be updated');
    }
  }
}
