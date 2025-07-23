import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skills } from './skills.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    // eslint-disable-next-line no-unused-vars
    private skillsRepo: Repository<Skills>,
  ) {}

  findAll() {
    return this.skillsRepo.find({ order: { id: 'ASC' } });
  }

  create(data) {
    return this.skillsRepo.save(data);
  }

  update(id: number, data: Partial<Skills>) {
    return this.skillsRepo.update({ id }, data);
  }

  delete(id: number) {
    return this.skillsRepo.delete({ id });
  }
}
