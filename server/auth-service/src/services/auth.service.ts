import { Injectable } from '@nestjs/common';
import { BasicAuth } from 'src/entities/basic-auth.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource) {}

  public async createBasicAuth(
    userId: string,
    password: string,
  ): Promise<BasicAuth> {
    const basicAuthRepository = this.dataSource.getRepository(BasicAuth);

    const basicAuth = basicAuthRepository.create({
      userId,
      password,
    });

    return basicAuthRepository.save(basicAuth);
  }

  public async compareUserPassword(
    userId: string,
    password: string,
  ): Promise<boolean> {
    const basicAuthRepository = this.dataSource.getRepository(BasicAuth);

    return basicAuthRepository.findOneBy({ userId }).then((basicAuth) => {
      return bcrypt.compare(password, basicAuth.password);
    });
  }
}
