import { Controller, Post, Request } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post('/register')
    async register(@Request() req) {
        return this.registerService.register(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            req.body.username,
            req.body.avatar,
        );
    }
}
