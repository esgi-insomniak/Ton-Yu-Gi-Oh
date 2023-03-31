import { Token } from 'src/entities/token.entity';

export interface ITokenCreateResponse {
  status: number;
  message?: string;
  token?: Token;
}

export interface ITokenDestroyResponse {
  status: number;
  message?: string;
}

export interface ITokenDecodeResponse {
  status: number;
  message?: string;
  data?: {
    userId: string;
  };
}
