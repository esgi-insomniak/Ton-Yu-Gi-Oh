import { apiRequest } from "@/helpers/api";
import { responseAuthSchema, responseAuthSchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URL = {
    getAuthHistories: () => "/login_histories",
} as const

const token = localStorage.getItem('token')

const requestAllPayements = () => apiRequest({
    url: QUERY_URL.getAuthHistories(),
    method: 'GET',
    token: !!token ? token : undefined
}, responseAuthSchema)

export const useGetAuthLogs = () => {
    const { data, isLoading, error, refetch } = useQuery<responseAuthSchemaType>(['getAuthHistories'], () => requestAllPayements())

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}