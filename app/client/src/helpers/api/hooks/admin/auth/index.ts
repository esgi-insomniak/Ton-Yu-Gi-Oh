import { apiRequest } from "@/helpers/api";
import { responseAuthSchema, responseAuthSchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URL = {
    getAuthHistories: (limit: number, page: number) => `/login_histories?limit=${limit}&offset=${page}`,
} as const

const token = localStorage.getItem('token')

const requestAllPayements = (limit: number, page: number) => apiRequest({
    url: QUERY_URL.getAuthHistories(limit, page),
    method: 'GET',
    token: !!token ? token : undefined
}, responseAuthSchema)

export const useGetAuthLogs = (limit?: number, page?: number) => {
    const { data, isLoading, error, refetch } = useQuery<responseAuthSchemaType>(['getAuthHistories', limit, page], () => requestAllPayements(limit!, page!))

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}