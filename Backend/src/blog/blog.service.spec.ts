import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Blog],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Blog]),
      ],
      providers: [BlogService],
    }).compile();

    service = module.get<BlogService>(BlogService);

    await service['blogRepo'].save([
      {
        id: 1,
        title: 'Test 1',
        description: 'Desc 1',
        image: 'Img 1',
        link: 'Link 1',
      },
    ]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all blog entries', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Test 1');
  });

  it('update should update an blog entry', async () => {
    const updated = await service.update(1, { title: 'Updated' });
    expect(updated!.title).toBe('Updated');
  });

  it('update should throw if entry not found', async () => {
    await expect(service.update(999, { title: 'X' })).rejects.toThrow(
      'Blog post not found',
    );
  });

  it('create should create an blog entry', async () => {
    const data = {
      title: 'New Blog',
      description: 'New Desc',
      image: 'New Img',
      link: 'New Link',
    };
    const created = await service.create(data);
    expect(created).toMatchObject(data);
    expect(created.id).toBeDefined();
  });

  it('delete should delete an about entry', async () => {
    const deleted = await service.delete(1);
    expect(deleted).toEqual({ deleted: true });
  });
});
