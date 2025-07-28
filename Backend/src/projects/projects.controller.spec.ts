import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';

describe('ProjectsController (e2e with sqlite memory)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /projects returns empty array', async () => {
    await request(app.getHttpServer() as unknown as import('http').Server)
      .get('/projects')
      .expect(200)
      .expect([]);
  });

  it('POST /projects creates project', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .post('/projects')
      .send({
        title: 'Neu',
        category: 'A',
        image: '',
        description: '',
        link: '',
      })
      .expect(201);
    expect(res.body).toMatchObject({ title: 'Neu', category: 'A' });
  });

  it('GET /projects returns created project', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/projects')
      .expect(200);
    const projects = res.body as Array<{
      id: number;
      title: string;
      category: string;
    }>;
    expect(projects.length).toBe(1);
    expect(projects[0]).toMatchObject({ title: 'Neu', category: 'A' });
  });

  it('PUT /projects/:id updates project', async () => {
    const getRes = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/projects')
      .expect(200);
    const projects = getRes.body as Array<{ id: number }>;
    const id = projects[0].id;
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .put(`/projects/${id}`)
      .send({ title: 'Up' })
      .expect(200);
    expect(res.body).toMatchObject({ title: 'Up' });
  });

  it('DELETE /projects/:id deletes project', async () => {
    const getRes = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/projects')
      .expect(200);
    const projects = getRes.body as Array<{ id: number }>;
    const id = projects[0].id;
    await request(app.getHttpServer() as unknown as import('http').Server)
      .delete(`/projects/${id}`)
      .expect(200)
      .expect({ deleted: true });
    await request(app.getHttpServer() as unknown as import('http').Server)
      .get('/projects')
      .expect(200)
      .expect([]);
  });

  it('POST /projects returns 400 on missing required', async () => {
    await request(app.getHttpServer() as unknown as import('http').Server)
      .post('/projects')
      .send({})
      .expect(400);
  });

  it('PUT /projects/:id returns 404 if not found', async () => {
    await request(app.getHttpServer() as unknown as import('http').Server)
      .put('/projects/999')
      .send({ title: 'Up' })
      .expect(404);
  });
});
