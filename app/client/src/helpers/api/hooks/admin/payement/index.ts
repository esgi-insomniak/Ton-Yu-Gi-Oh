import { apiRequest } from "@/helpers/api";
import { responseGetAllPromoCodesSchema, responseGetAllPromoCodesSchemaType, responsePaymentHistorySchemaType } from "@/helpers/utils/schema/Admin";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URL = {
    getAllPayements: () => `/payment_histories`,
} as const

const token = localStorage.getItem('token')

const requestAllPayements = () => apiRequest({
    url: QUERY_URL.getAllPayements(),
    method: 'GET',
    token: !!token ? token : undefined
}, responseGetAllPromoCodesSchema)

export const useGetAllPayements = () => {
    const { data, isLoading, error, refetch } = useQuery<responseGetAllPromoCodesSchemaType>(['getAllPayements'], () => requestAllPayements())

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}