/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

interface AuthUser {
  id: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // Validate user credentials (replace with your real user lookup)
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ id: number; username: string } | null> {
    const user: User | null = await this.userService.findByUsername(username);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return { id: user.id, username: user.username };
  }

  // Login: set JWT cookie
  async login(user: AuthUser, res: Response) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ message: 'Logged in' });
  }
}
