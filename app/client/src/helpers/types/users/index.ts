import { ROLES } from "@/helpers/utils/enum/roles";
import { ApiGetItemResponse } from "../common";


export interface UserManagementContextProps {
    children: React.ReactNode;
}
export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: ROLES[];
    createdAt: string;
    updatedAt: string;
    username: string;
    coins?: number;
}

export type UserContextType = Omit<UserType, 'createdAt' | 'updatedAt' | 'firstName' | 'lastName'>

export type DecodedTokenType = Omit<UserContextType, 'id'> & {
    userId: string
    iat: number
    exp: number
}

export type AuthRegisterType = Omit<UserContextType, 'id' | 'roles'> & {
    password: string
}

export type UserMe = ApiGetItemResponse<Omit<UserType, 'createdAt' | 'updatedAt'>> 