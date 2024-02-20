import { Controller } from '@nestjs/common';
import { MailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: MailService) {}
}
