import { Controller, Post, Request } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) { }

    @Post('/login')
    async login(@Request() req) {
        return this.loginService.login(
            req.body.username,
            req.body.password,
        );
    }
}
