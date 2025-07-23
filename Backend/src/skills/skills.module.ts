import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { Skills } from './skills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skills])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
