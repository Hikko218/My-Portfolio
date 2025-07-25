/* eslint-disable no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepo: Repository<Project>,
  ) {}

  // Returns all projects ordered by ID
  async findAll() {
    try {
      return await this.projectsRepo.find({ order: { id: 'ASC' } });
    } catch {
      // Throws if there is a problem loading projects
      throw new BadRequestException('Error loading projects');
    }
  }

  // Creates a new project entry
  async create(data: Partial<Project>) {
    try {
      return await this.projectsRepo.save(data);
    } catch {
      // Throws if project creation fails
      throw new BadRequestException('Project could not be created');
    }
  }

  // Updates an existing project by ID
  async update(id: number, data: Partial<Project>) {
    const project = await this.projectsRepo.findOne({ where: { id } });
    if (!project) {
      // Throws if project is not found
      throw new NotFoundException('Project not found');
    }
    try {
      await this.projectsRepo.update({ id }, data);
      return await this.projectsRepo.findOne({ where: { id } });
    } catch {
      // Throws if project update fails
      throw new BadRequestException('Project could not be updated');
    }
  }

  // Deletes a project by ID
  async delete(id: number) {
    const project = await this.projectsRepo.findOne({ where: { id } });
    if (!project) {
      // Throws if project is not found
      throw new NotFoundException('Project not found');
    }
    try {
      await this.projectsRepo.delete({ id });
      return { deleted: true };
    } catch {
      // Throws if project deletion fails
      throw new BadRequestException('Project could not be deleted');
    }
  }
}
