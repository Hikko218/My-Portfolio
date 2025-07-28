import { AuthGuard } from '@nestjs/passport';

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Mock-Guard, der immer true zurückgibt und einen User setzt
import { Request } from 'express';
class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request & { user?: any } = context.switchToHttp().getRequest();
    req.user = { userId: 1, username: 'admin' };
    return true;
  }
}

describe('AuthController', () => {
  let app: INestApplication;
  let authService: Partial<Record<string, jest.Mock>>;

  beforeAll(async () => {
    authService = {
      validateUser: jest.fn(),
      login: jest.fn(),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useClass(MockAuthGuard)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('should return 401 if credentials are invalid', async () => {
      (authService.validateUser as jest.Mock).mockResolvedValue(null);
      await request(app.getHttpServer() as import('http').Server)
        .post('/auth/login')
        .send({ username: 'foo', password: 'bar' })
        .expect(401)
        .expect({ message: 'Invalid credentials' });
    });

    it('should call authService.login if credentials are valid', async () => {
      const user = { id: 1, username: 'foo' };
      (authService.validateUser as jest.Mock).mockResolvedValue(user);
      (authService.login as jest.Mock).mockImplementation(
        (_user, res: import('express').Response) => {
          res.send({ message: 'Logged in' });
          return undefined;
        },
      );
      await request(app.getHttpServer() as import('http').Server)
        .post('/auth/login')
        .send({ username: 'foo', password: 'bar' })
        .expect(200)
        .expect({ message: 'Logged in' });
      expect(authService.login).toHaveBeenCalledWith(user, expect.any(Object));
    });
  });

  describe('/auth/admin (GET)', () => {
    it('should return protected admin data and user', async () => {
      const res = await request(app.getHttpServer() as import('http').Server)
        .get('/auth/admin')
        .expect(200);
      expect(res.body).toEqual({
        message: 'Protected admin data',
        user: { userId: 1, username: 'admin' },
      });
    });
  });

  describe('/auth/logout (POST)', () => {
    it('should clear cookie and send response', async () => {
      const res = await request(app.getHttpServer() as import('http').Server)
        .post('/auth/logout')
        .expect(200);
      expect(res.body).toEqual({ message: 'Logged out' });
    });
  });
});
