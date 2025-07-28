import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, BadRequestException } from '@nestjs/common';
import * as request from 'supertest';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('ContactController', () => {
  let app: INestApplication;
  let contactService: { sendMail: jest.Mock };

  beforeAll(async () => {
    contactService = { sendMail: jest.fn() };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [{ provide: ContactService, useValue: contactService }],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return { success: true } on valid post', async () => {
    contactService.sendMail.mockResolvedValueOnce(undefined);
    await request(app.getHttpServer() as import('http').Server)
      .post('/contact')
      .send({ name: 'Max', email: 'max@example.com', message: 'Hallo' })
      .expect(201)
      .expect({ success: true });
    expect(contactService.sendMail).toHaveBeenCalledWith(
      'Max',
      'max@example.com',
      'Hallo',
    );
  });

  it('should return 400 if service throws', async () => {
    contactService.sendMail.mockRejectedValueOnce(
      new BadRequestException('fail'),
    );
    await request(app.getHttpServer() as import('http').Server)
      .post('/contact')
      .send({ name: 'Max', email: 'max@example.com', message: 'Hallo' })
      .expect(400);
  });
});
