import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.aboutRepo.find({ order: { id: 'ASC' } });
  }

  update(id: number, data: Partial<About>) {
    return this.aboutRepo.update({ id }, data);
  }
}
