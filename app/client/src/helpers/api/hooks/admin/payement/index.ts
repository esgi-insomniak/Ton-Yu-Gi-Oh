import { apiRequest } from "@/helpers/api";
import { responseGetAllPromoCodesSchema, responseGetAllPromoCodesSchemaType, responsePaymentHistorySchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URL = {
    getAllPayements: (limit: number, page: number) => `/payment_histories?limit=${limit}&offset=${page}`,
    getPayementById: (id: string) => `/users/${id}/payment_histories`,
} as const

const token = localStorage.getItem('token')

const requestAllPayements = (limit: number, page: number) => apiRequest({
    url: QUERY_URL.getAllPayements(limit, page),
    method: 'GET',
    token: !!token ? token : undefined
}, responseGetAllPromoCodesSchema)

const requestPayementById = (id: string) => apiRequest({
    url: QUERY_URL.getPayementById(id),
    method: 'GET',
    token: !!token ? token : undefined
}, responseGetAllPromoCodesSchema)

export const useGetAllPayements = (limit?: number, page?: number) => {
    const { data, isLoading, error, refetch } = useQuery<responseGetAllPromoCodesSchemaType>(['getAllPayements', limit, page], () => requestAllPayements(limit!, page!))

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}

export const useGetPayementById = (id: string) => {
    const { data, isLoading, error, refetch } = useQuery<responseGetAllPromoCodesSchemaType>(['getPayementById', id], () => requestPayementById(id))

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}