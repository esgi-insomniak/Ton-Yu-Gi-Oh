export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  coins: number;
  roles: string[];
}

export enum IUserRoles {
  admin = 'admin',
  user = 'user',
}
