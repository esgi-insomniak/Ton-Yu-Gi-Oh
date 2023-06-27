import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import React from "react";
import { PromoCodeSchema, PromoCodeSchemaType, responsePromoCodeSchema, responsePromoCodeSchemaType } from "@/helpers/utils/schema/shop";

const QUERY_URLS = {
    getAllPromos: (limit: number, offset: number) => `/promo_codes?limit=${limit}&offset=${offset}`,
    postPromoCode: () => `/promo_codes`,
    deletePromoCode: (id: string) => `/promo_codes/${id}`,
} as const;

const token = localStorage.getItem('token')

const requestAllPromos = (limit: number, offset: number) => apiRequest({
    url: QUERY_URLS.getAllPromos(limit, offset),
    method: 'GET',
    token: !!token ? token : undefined
}, responsePromoCodeSchema)

const requestPostPromoCode = (body: PromoCodeSchemaType) => apiRequest({
    url: QUERY_URLS.postPromoCode(),
    method: 'POST',
    body,
    token: !!token ? token : undefined
})

const requestDeletePromoCode = (id: string) => apiRequest({
    url: QUERY_URLS.deletePromoCode(id),
    method: 'DELETE',
    token: !!token ? token : undefined
})

export const useGetAllPromos = (limit: number, offset: number) => {
    const { data, isLoading, error, refetch } = useQuery<responsePromoCodeSchemaType>(['getAllPromos', limit, offset], () => requestAllPromos(limit, offset))

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}

export const usePostPromoCode = () => useMutation((data: PromoCodeSchemaType) => requestPostPromoCode(data))

export const useDeletePromoCode = () => useMutation((id: string) => requestDeletePromoCode(id))