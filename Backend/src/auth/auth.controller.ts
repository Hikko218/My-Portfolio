import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
  user: { userId: number; username: string };
}

interface LoginBody {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly authService: AuthService) {}

  // Login route: expects username and password in body
  @Post('login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    await this.authService.login(user, res);
  }

  // Protected admin route
  @UseGuards(AuthGuard('jwt'))
  @Get('admin')
  getAdminData(@Req() req: RequestWithCookies) {
    return { message: 'Protected admin data', user: req.user };
  }

  // Logout route
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token', { path: '/' });
    return res.send({ message: 'Logged out' });
  }
}
