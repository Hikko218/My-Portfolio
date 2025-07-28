import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsService (e2e with sqlite memory)', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Project],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Project]),
      ],
      providers: [ProjectsService],
    }).compile();
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create, findAll, update, delete (happy path)', async () => {
    // create
    const created = await service.create({
      title: 'Test',
      category: 'A',
      image: '',
      description: '',
      link: '',
    });
    expect(created).toMatchObject({ title: 'Test', category: 'A' });

    // findAll
    const all = await service.findAll();
    expect(all.length).toBe(1);
    expect(all[0]).toMatchObject({ title: 'Test', category: 'A' });

    // update
    const updated = await service.update(all[0].id, { title: 'Neu' });
    expect(updated).toMatchObject({ title: 'Neu', category: 'A' });

    // delete
    const del = await service.delete(all[0].id);
    expect(del).toEqual({ deleted: true });
    expect(await service.findAll()).toEqual([]);
  });

  it('update throws if not found', async () => {
    await expect(service.update(999, { title: 'X' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete throws if not found', async () => {
    await expect(service.delete(999)).rejects.toThrow(NotFoundException);
  });
});
