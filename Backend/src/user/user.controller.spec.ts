import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserController (e2e with sqlite memory)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
    // Seed test user
    const service = module.get<UserService>(UserService);
    await service['userRepo'].save([
      {
        id: 1,
        username: 'testuser',
        password: 'pw',
      },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /user/:id returns user', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .get('/user/1')
      .expect(200);
    const user = res.body as { username: string };
    expect(user.username).toBe('testuser');
  });

  it('PUT /user/:id updates a user', async () => {
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .put('/user/1')
      .send({ username: 'updated', password: 'pw' })
      .expect(200);
    const updated = res.body as { username: string };
    expect(updated.username).toBe('updated');
  });

  it('DELETE /user/:id deletes a user', async () => {
    await request(app.getHttpServer() as unknown as import('http').Server)
      .delete('/user/1')
      .expect(200)
      .expect({ deleted: true });
    // Prüfe, dass der User nicht mehr gefunden wird
    await request(app.getHttpServer() as unknown as import('http').Server)
      .get('/user/1')
      .expect(200)
      .expect({});
  });
});
