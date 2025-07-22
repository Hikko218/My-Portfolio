/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepo: Repository<Project>,
  ) {}

  findAll() {
    return this.projectsRepo.find({ order: { id: 'ASC' } });
  }

  create(data: Partial<Project>) {
    return this.projectsRepo.save(data);
  }

  update(id: number, data: Partial<Project>) {
    return this.projectsRepo.update({ id }, data);
  }

  delete(id: number) {
    return this.projectsRepo.delete({ id });
  }
}
