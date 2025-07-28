import { Test, TestingModule } from '@nestjs/testing';
import { SkillsController } from './skills.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SkillsService } from './skills.service';
import { Skills } from './skills.entity';

describe('SkillsController (e2e with sqlite memory)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
      controllers: [SkillsController],
      providers: [SkillsService],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /skills, GET /skills, PUT /skills/:id, DELETE /skills/:id', async () => {
    // POST
    const createRes = await request(
      app.getHttpServer() as import('http').Server,
    )
      .post('/skills')
      .send({ skill: 'TS', level: 5 })
      .expect(201);
    expect(createRes.body).toMatchObject({ skill: 'TS', level: 5 });

    // GET
    const getRes = await request(app.getHttpServer() as import('http').Server)
      .get('/skills')
      .expect(200);

    const skills = getRes.body as Array<{
      id: number;
      skill: string;
      level: number;
    }>;
    expect(skills.length).toBe(1);
    expect(skills[0]).toMatchObject({ skill: 'TS', level: 5 });

    const id = skills[0].id;

    // PUT
    const putRes = await request(app.getHttpServer() as import('http').Server)
      .put(`/skills/${id}`)
      .send({ skill: 'JS' })
      .expect(200);
    expect(putRes.body).toMatchObject({ skill: 'JS', level: 5 });

    // DELETE
    await request(app.getHttpServer() as import('http').Server)
      .delete(`/skills/${id}`)
      .expect(200)
      .expect({ deleted: true });

    // GET (empty)
    const getEmpty = await request(app.getHttpServer() as import('http').Server)
      .get('/skills')
      .expect(200);
    expect(getEmpty.body).toEqual([]);
  });

  it('PUT /skills/:id returns 404 if not found', async () => {
    await request(app.getHttpServer() as import('http').Server)
      .put('/skills/999')
      .send({ skill: 'X' })
      .expect(404);
  });

  it('DELETE /skills/:id returns 404 if not found', async () => {
    await request(app.getHttpServer() as import('http').Server)
      .delete('/skills/999')
      .expect(404);
  });
});
