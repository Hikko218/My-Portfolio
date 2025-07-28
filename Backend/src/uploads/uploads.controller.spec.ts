import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UploadsController } from './uploads.controller';
import { join } from 'path';
import * as fs from 'fs';

describe('UploadsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
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

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('POST /uploads should upload a file', async () => {
    // Dummy file anlegen
    const testFilePath = join(__dirname, 'testfile.txt');
    fs.writeFileSync(testFilePath, 'test-content');
    const res = await request(
      app.getHttpServer() as unknown as import('http').Server,
    )
      .post('/uploads')
      .attach('file', testFilePath)
      .expect(201);
    expect(res.body).toBeDefined();
    // Aufräumen
    fs.unlinkSync(testFilePath);
  });
});
