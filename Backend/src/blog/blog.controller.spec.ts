import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './blog.entity';

describe('BlogController (e2e with sqlite memory)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
      controllers: [BlogController],
      providers: [BlogService],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
    // Seed test data
    const service = module.get<BlogService>(BlogService);
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

  afterAll(async () => {
    await app.close();
  });

  it('GET /blog returns all blog entries', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/blog')
      .expect(200);
    const blogs = res.body as Array<{
      id: number;
      title: string;
      description: string;
      image: string;
      link: string;
    }>;
    expect(blogs.length).toBeGreaterThanOrEqual(1);
    expect(blogs[0].title).toBe('Test 1');
  });

  it('POST /blog creates a blog entry', async () => {
    const data = {
      title: 'New Blog',
      description: 'New Desc',
      image: 'New Img',
      link: 'New Link',
    };
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .post('/blog')
      .send(data)
      .expect(201);
    const created = res.body as {
      id: number;
      title: string;
      description: string;
      image: string;
      link: string;
    };
    expect(created).toMatchObject(data);
    expect(created.id).toBeDefined();
  });

  it('PUT /blog/:id updates a blog entry', async () => {
    // get id
    const getRes = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/blog')
      .expect(200);
    const blogs = getRes.body as Array<{ id: number }>;
    const id = blogs[0].id;
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .put(`/blog/${id}`)
      .send({ title: 'Updated' })
      .expect(200);
    const updated = res.body as { title: string };
    expect(updated.title).toBe('Updated');
  });

  it('DELETE /blog/:id deletes a blog entry', async () => {
    // get id
    const getRes = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/blog')
      .expect(200);
    const blogs = getRes.body as Array<{ id: number }>;
    const id = blogs[0].id;
    await request(app.getHttpServer() as unknown as import('http').Server)
      .delete(`/blog/${id}`)
      .expect(200)
      .expect({ deleted: true });
    // check empty
    const afterDeleteRes = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/blog')
      .expect(200);
    const blogsAfterDelete = afterDeleteRes.body as Array<{ id: number }>;
    expect(blogsAfterDelete.find((b) => b.id === id)).toBeUndefined();
  });
});
