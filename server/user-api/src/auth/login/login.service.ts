import { Injectable } from '@nestjs/common';
import { ILogin } from './login.interface';

@Injectable()
export class LoginService {
    async login(username: string, password: string): Promise<ILogin> {
        return {
            username,
            password,
        };
    }
}
