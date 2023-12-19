import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Render,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('/login')
  @Render('auth/login')
  login() {
    return { message: 'Renderiza el login' };
  }

  @Public()
  @Get('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    response.redirect('/auth/login');
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: Response,
  ) {
    const authResult = await this.authService.signIn(createAuthDto);
    response.cookie('jwt', authResult.jwt, { httpOnly: true });
    response.redirect('/admin/dashboard');
  }
}
