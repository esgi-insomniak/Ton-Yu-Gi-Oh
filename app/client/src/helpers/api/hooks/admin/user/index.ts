import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import { getAllUsersSchema, getAllUsersSchemaType } from "@/helpers/utils/schema/Admin";

const QUERY_URLS = {
    getAllUsers: (limit: number, offset: number) => `/users?limit=${limit}&offset=${offset}`,
} as const;

const token = localStorage.getItem('token')

const requestAllUsers = (limit: number, offset: number) => apiRequest({
    url: QUERY_URLS.getAllUsers(limit, offset),
    method: 'GET',
    token: !!token ? token : undefined
}, getAllUsersSchema)

export const useGetAllUsers = (limit: number, offset: number) => useQuery<getAllUsersSchemaType>(['getAllUsers', limit, offset], () => requestAllUsers(limit, offset))