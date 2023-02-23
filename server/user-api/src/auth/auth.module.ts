import { Module } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { RegisterModule } from './register/register.module';
import { RegisterService } from './register/register.service';

@Module({
    providers: [
        LoginService,
        RegisterService,
    ],
    imports: [RegisterModule],
})
export class AuthModule { }
