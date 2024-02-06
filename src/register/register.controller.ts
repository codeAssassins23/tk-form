import { Controller, Get, Render, Req } from '@nestjs/common';
import { RegisterService } from './register.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('/')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Public()
  @Get('/register')
  @Render('register/register')
  async getRegister(@Req() request: Request) {
    try {
      const user = request['user'];
      return {
        user: user,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
