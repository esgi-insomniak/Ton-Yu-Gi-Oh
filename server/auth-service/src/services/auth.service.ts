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

    const basicAuth = await basicAuthRepository.findOneBy({ userId });

    return await bcrypt.compare(password, basicAuth.password);
  }

  public async getBasicAuthConfirmationToken(
    userId: string,
  ): Promise<Pick<BasicAuth, 'confirmationToken'>> {
    const basicAuthRepository = this.dataSource.getRepository(BasicAuth);

    const basicAuth = await basicAuthRepository.findOneBy({ userId });

    return {
      confirmationToken: basicAuth.confirmationToken,
    };
  }

  public async generateBasicAuthRenewToken(
    userId: string,
  ): Promise<Pick<BasicAuth, 'renewToken'>> {
    const basicAuthRepository = this.dataSource.getRepository(BasicAuth);

    const basicAuth = await basicAuthRepository.findOneBy({ userId });

    basicAuth.generateRenewToken();

    await basicAuthRepository.save(basicAuth);

    return {
      renewToken: basicAuth.renewToken,
    };
  }

  public async confirmBasicAuthAccount(
    confirmationToken: string,
  ): Promise<boolean> {
    const basicAuthRepository = this.dataSource.getRepository(BasicAuth);

    const basicAuth = await basicAuthRepository.findOneBy({
      confirmationToken,
    });

    if (!basicAuth) {
      return false;
    }

    basicAuth.confirmationToken = null;
    await basicAuthRepository.save(basicAuth);

    return true;
  }

  public async changeBasicAuthPassword(
    renewToken: string,
    password: string,
  ): Promise<boolean> {
    const basicAuthRepository = this.dataSource.getRepository(BasicAuth);

    const basicAuth = await basicAuthRepository.findOneBy({
      renewToken,
    });

    if (!basicAuth) {
      return false;
    }

    basicAuth.renewToken = null;
    basicAuth.changePassword(password);

    await basicAuthRepository.save(basicAuth);

    return true;
  }
}
