import { ROLES } from "@/helpers/utils/enum/roles";
import { ApiGetItemResponse } from "../common";
import { userSchemaType } from "@/helpers/utils/schema/Admin";


export interface SocketContextProps {
    children: React.ReactNode;
}

export type DecodedTokenType = Omit<userSchemaType, 'id'> & {
    userId: string
    iat: number
    exp: number
}

export type AuthRegisterType = Omit<userSchemaType, 'id' | 'roles'> & {
    password: string
}

export type UserMe = ApiGetItemResponse<userSchemaType> 