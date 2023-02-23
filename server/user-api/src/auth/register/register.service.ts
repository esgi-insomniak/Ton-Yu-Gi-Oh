import { Injectable } from '@nestjs/common';
import { IRegister } from './register.interface';

@Injectable()
export class RegisterService {
    async register(firstName: string, lastName: string, email: string, password: string, username: string, avatar?: string): Promise<IRegister> {
        return {
            firstName,
            lastName,
            email,
            password,
            username,
            avatar,
        };
    }
}
