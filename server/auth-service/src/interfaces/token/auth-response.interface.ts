import { BasicAuth } from 'src/entities/basic-auth.entity';

export interface IAuthCreateResponse {
  status: number;
  message?: string;
  auth: BasicAuth;
}
