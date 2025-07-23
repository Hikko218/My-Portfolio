import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { About } from './about.entity';

@Module({
  imports: [TypeOrmModule.forFeature([About])],
  providers: [AboutService],
  controllers: [AboutController],
  exports: [AboutService],
})
export class AboutModule {}
