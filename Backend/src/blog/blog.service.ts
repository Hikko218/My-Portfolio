import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepo: Repository<Blog>,
    ) { }

    findAll() {
        return this.blogRepo.find({ order: { id: 'ASC' } });
    }
    create(data: Partial<Blog>) {
        return this.blogRepo.save(data);
    }

    update(id: number, data: Partial<Blog>) {
        return this.blogRepo.update({ id }, data);
    }

    delete(id: number) {
        return this.blogRepo.delete({ id });
    }
}
