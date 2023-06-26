import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import { getAllUsersSchema, getAllUsersSchemaType, responsePatchUserSchema, userSchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";

const QUERY_URLS = {
    getAllUsers: (limit: number, offset: number) => `/users?limit=${limit}&offset=${offset}`,
    patchUser: (id: string) => `/users/${id}`,
} as const;

const token = localStorage.getItem('token')

const requestAllUsers = (limit: number, offset: number) => apiRequest({
    url: QUERY_URLS.getAllUsers(limit, offset),
    method: 'GET',
    token: !!token ? token : undefined
}, getAllUsersSchema)

const requestPatchUser = (id: string, data: userSchemaType) => apiRequest({
    url: QUERY_URLS.patchUser(id),
    method: 'PATCH',
    token: !!token ? token : undefined,
    body: data
}, responsePatchUserSchema)

export const useGetAllUsers = (limit: number, offset: number) => {
    const { data, isLoading, error, refetch } = useQuery<getAllUsersSchemaType>(['getAllUsers', limit, offset], () => requestAllUsers(limit, offset))

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}

export const usePatchUser = () => useMutation((data: userSchemaType) => requestPatchUser(data.id, data))