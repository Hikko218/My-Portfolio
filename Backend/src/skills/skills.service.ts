import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skills } from './skills.entity';
import { CreateSkillsDto } from './dto/create-skills.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    // eslint-disable-next-line no-unused-vars
    private skillsRepo: Repository<Skills>,
  ) {}

  // Returns all skills ordered by ID
  async findAll() {
    try {
      return await this.skillsRepo.find({ order: { id: 'ASC' } });
    } catch {
      // Throws if there is a problem loading skills
      throw new BadRequestException('Error loading skills');
    }
  }

  // Creates a new skill entry
  async create(data: CreateSkillsDto) {
    try {
      return await this.skillsRepo.save(data);
    } catch {
      // Throws if skill creation fails
      throw new BadRequestException('Skill could not be created');
    }
  }

  // Updates an existing skill by ID
  async update(id: number, data: Partial<Skills>) {
    const skill = await this.skillsRepo.findOne({ where: { id } });
    if (!skill) {
      // Throws if skill is not found
      throw new NotFoundException('Skill not found');
    }
    try {
      await this.skillsRepo.update({ id }, data);
      return await this.skillsRepo.findOne({ where: { id } });
    } catch {
      // Throws if skill update fails
      throw new BadRequestException('Skill could not be updated');
    }
  }

  // Deletes a skill by ID
  async delete(id: number) {
    const skill = await this.skillsRepo.findOne({ where: { id } });
    if (!skill) {
      // Throws if skill is not found
      throw new NotFoundException('Skill not found');
    }
    try {
      await this.skillsRepo.delete({ id });
      return { deleted: true };
    } catch {
      // Throws if skill deletion fails
      throw new BadRequestException('Skill could not be deleted');
    }
  }
}
