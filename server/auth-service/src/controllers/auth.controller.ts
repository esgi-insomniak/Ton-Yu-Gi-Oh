import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
}
