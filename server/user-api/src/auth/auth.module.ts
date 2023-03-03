import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { RegisterModule } from './register/register.module';
import { RegisterService } from './register/register.service';

@Module({
    imports: [RegisterModule, LoginModule],
})
export class AuthModule { }
