/* eslint-disable no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  //Returns user by ID
  async findOne(id: number) {
    try {
      return await this.userRepo.findOne({ where: { id } });
    } catch {
      throw new BadRequestException('Error loading user');
    }
  }

  //Returns user by username
  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.userRepo.findOne({ where: { username } });
    } catch {
      throw new BadRequestException('Error loading user');
    }
  }

  // Creates new user
  async create(data: CreateUserDto) {
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userToSave = { ...data, password: hashedPassword };
      const savedUser = await this.userRepo.save(userToSave);
      return { created: true, id: savedUser.id, username: savedUser.username };
    } catch {
      throw new BadRequestException('User could not be created');
    }
  }
  // Update existing user by ID
  async update(id: number, data: CreateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      // Throws if user is not found
      throw new NotFoundException('User not found');
    }
    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userToSave = { ...data, password: hashedPassword };
      await this.userRepo.update({ id }, userToSave);
      // Return username and ID
      const updatedUser = await this.userRepo.findOne({ where: { id } });
      if (!updatedUser) throw new NotFoundException('User not found');
      return { id: updatedUser.id, username: updatedUser.username };
    } catch {
      // Throws if user update fails
      throw new BadRequestException('User could not be updated');
    }
  }

  // Deltes a user by ID
  async delete(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      // Throws if user is not found
      throw new NotFoundException('User not found');
    }
    try {
      await this.userRepo.delete({ id });
      return { deleted: true };
    } catch {
      // Throws if user deletion fails
      throw new BadRequestException('User could not be deleted');
    }
  }
}
