import { apiRequest } from "@/helpers/api";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { ExchangeSchemaType, responseExchangeSchema } from "@/helpers/utils/schema/Admin";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URL = {
    getAllExchanges: () => `/exchanges`,
}

const token = localStorage.getItem('token')

const requestAllExchanges = () => apiRequest({
    url: QUERY_URL.getAllExchanges(),
    method: 'GET',
    token: !!token ? token : undefined
}, responseExchangeSchema)

export const useGetAllExchanges = () => {
    const { data, isLoading, error, refetch } = useQuery<ApiGetItemResponse<ExchangeSchemaType[]>>(['getAllExchanges'], () => requestAllExchanges())

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}