import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { About } from './about.entity';

describe('AboutController (e2e with sqlite memory)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
      controllers: [AboutController],
      providers: [AboutService],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
    // Seed test data
    const service = module.get<AboutService>(AboutService);
    await service['aboutRepo'].save([
      {
        id: 1,
        name: 'Test 1',
        description: 'Desc 2',
        phone: 'Desc 1',
        email: 'Desc 1',
        image: 'Desc 1',
      },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /about returns all about entries', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/about')
      .expect(200);
    const abouts = res.body as Array<{
      id: number;
      name: string;
      description: string;
      phone: string;
      email: string;
      image: string;
    }>;
    expect(abouts.length).toBeGreaterThanOrEqual(1);
    expect(abouts[0].name).toBe('Test 1');
  });

  it('PUT /about/:id updates an about entry', async () => {
    // get id
    const getRes = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/about')
      .expect(200);
    const abouts = getRes.body as Array<{ id: number }>;
    const id = abouts[0].id;
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .put(`/about/${id}`)
      .send({ name: 'Updated' })
      .expect(200);
    const updated = res.body as { name: string };
    expect(updated.name).toBe('Updated');
  });
});
