import { Controller, Post, Body, UseGuards, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckDuplicateUsernameOrEmailMiddleware, TokenMiddleware } from 'src/middlewares/middlewares.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseGuards(CheckDuplicateUsernameOrEmailMiddleware)
  async signup(@Body() body: { username: string; email: string; password: string; roles: string[] }) {
    return this.authService.signUp(body.username, body.email, body.password, body.roles);
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string}) {
    return this.authService.signIn(body.email, body.password);
  }

}
