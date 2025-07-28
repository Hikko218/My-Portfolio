import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from '../user/user.service';
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: Partial<UserService>;
  let jwtService: { sign: jest.Mock };

  beforeEach(() => {
    userService = {
      findByUsername: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('signed-jwt-token'),
    };
    authService = new AuthService(
      jwtService as unknown as import('@nestjs/jwt').JwtService,
      userService as UserService,
    );
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const user = { id: 1, username: 'test', password: 'hashed' };
      (userService.findByUsername as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await authService.validateUser('test', 'pw');
      expect(result).toEqual({ id: 1, username: 'test' });
    });

    it('should return null if user not found', async () => {
      (userService.findByUsername as jest.Mock).mockResolvedValue(null);
      const result = await authService.validateUser('test', 'pw');
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = { id: 1, username: 'test', password: 'hashed' };
      (userService.findByUsername as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result = await authService.validateUser('test', 'pw');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should set cookie and send response', async () => {
      const user = { id: 1, username: 'test' };
      const cookieMock = jest.fn(() => res);
      const sendMock = jest.fn(() => undefined);
      const res = {
        cookie: cookieMock,
        send: sendMock,
      } as unknown as Response;
      await authService.login(user, res);
      expect(() => jwtService.sign).toBeDefined();
      expect(cookieMock).toHaveBeenCalledWith(
        'token',
        'signed-jwt-token',
        expect.objectContaining({ httpOnly: true }),
      );
      expect(sendMock).toHaveBeenCalledWith({ message: 'Logged in' });
    });
  });
});
