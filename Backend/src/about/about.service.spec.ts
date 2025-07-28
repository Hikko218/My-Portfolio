import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutService } from './about.service';
import { About } from './about.entity';

describe('AboutService', () => {
  let service: AboutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [About],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([About]),
      ],
      providers: [AboutService],
    }).compile();

    service = module.get<AboutService>(AboutService);

    // Seed test data for the About entity
    await service['aboutRepo'].save([
      {
        id: 1, // First about entry
        name: 'Test 1',
        description: 'Desc 1',
        phone: 'Desc 1',
        email: 'Desc 1',
        image: 'Desc 1',
      },
      {
        id: 2, // Second about entry
        name: 'Test 2',
        description: 'Desc 2',
        phone: 'Desc 1',
        email: 'Desc 1',
        image: 'Desc 1',
      },
    ]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all about entries', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Test 1');
  });

  it('update should update an about entry', async () => {
    const updated = await service.update(1, { name: 'Updated' });
    expect(updated!.name).toBe('Updated');
  });

  it('update should throw if entry not found', async () => {
    await expect(service.update(999, { name: 'X' })).rejects.toThrow(
      'About entry not found',
    );
  });
});
