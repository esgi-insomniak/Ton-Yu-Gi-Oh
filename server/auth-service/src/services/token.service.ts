import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/entities/token.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { ConfigService } from './config/config.service';
import { ITokenParamsType } from 'src/interfaces/token/token-params.interface';

@Injectable()
export class TokenService {
  private configService: ConfigService;
  private tokenRepository: Repository<Token>;

  constructor(private readonly jwtService: JwtService, dataSource: DataSource) {
    this.configService = new ConfigService();
    this.tokenRepository = dataSource.getRepository(Token);
  }

  public async createToken({ username, userId, roles, email }: ITokenParamsType): Promise<Token> {
    const token = this.jwtService.sign(
      {
        userId,
        username,
        roles,
        email,
      },
      {
        expiresIn: this.configService.get('jwtExpiration'),
        secret: this.configService.get('jwtSecret'),
      },
    );

    return this.tokenRepository.save({
      userId,
      token,
    });
  }

  public async deleteTokenForUserId(userId: string): Promise<Token[]> {
    const tokens = await this.tokenRepository.findBy({ userId });
    return this.tokenRepository.remove(tokens);
  }

  public async decodeToken(token: string) {
    const result = {
      userId: null,
    };

    const tokenToDecode = await this.tokenRepository.findOneBy({ token });

    if (tokenToDecode) {
      try {
        const tokenData = this.jwtService.decode(tokenToDecode.token) as {
          exp: number;
          userId: string;
        };

        if (tokenData.exp > Math.floor(Date.now() / 1000)) {
          result.userId = tokenData.userId;
        }
      } catch (e) { }
    }
    return result;
  }
}
