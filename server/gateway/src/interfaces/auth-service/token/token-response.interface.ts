import { IToken } from './token.interface';

export interface ITokenCreateResponse {
  status: number;
  message?: string;
  token?: IToken;
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
