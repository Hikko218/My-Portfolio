import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from './skills.service';
import { Skills } from './skills.entity';
import { NotFoundException } from '@nestjs/common';

describe('SkillsService (e2e with sqlite memory)', () => {
  let service: SkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Skills],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Skills]),
      ],
      providers: [SkillsService],
    }).compile();
    service = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create, findAll, update, delete (happy path)', async () => {
    // create
    const created = await service.create({ skill: 'TS', level: 5 });
    expect(created).toMatchObject({ skill: 'TS', level: 5 });

    // findAll
    const all = await service.findAll();
    expect(all.length).toBe(1);
    expect(all[0]).toMatchObject({ skill: 'TS', level: 5 });

    // update
    const updated = await service.update(all[0].id, { skill: 'JS' });
    expect(updated).toMatchObject({ skill: 'JS', level: 5 });

    // delete
    const del = await service.delete(all[0].id);
    expect(del).toEqual({ deleted: true });
    expect(await service.findAll()).toEqual([]);
  });

  it('update throws if not found', async () => {
    await expect(service.update(999, { skill: 'X' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete throws if not found', async () => {
    await expect(service.delete(999)).rejects.toThrow(NotFoundException);
  });
});
