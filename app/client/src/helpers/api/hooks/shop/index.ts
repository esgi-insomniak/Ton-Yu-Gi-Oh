import { apiRequest } from '@/helpers/api'
import { ApiGetItemResponse } from '@/helpers/types/common'
import { BoosterApiResponse } from '@/helpers/types/shop'
import { BOOSTER_CODE } from '@/helpers/utils/constants'
import {
    responseSendPayementIcToStripeSchema, responseSendPayementIcToStripeSchemaType, responseConfirmPayementIcToStripeSchemaType, responseConfirmPayementIcToStripeSchema, responseBuyBoosterSchemaType, responseBuyBoosterSchema, sendBuyAmountSchema, responseOnePromoCodeSchema, responseOnePromoCodeSchemaType
} from '@/helpers/utils/schema/shop'
import React from 'react'
import { useMutation, useQuery } from 'react-query'

const QUERY_URLS = {
    payment: '/payment_checkout',
    confirmPayment: (sessionId: string) => `/payment_checkout/${sessionId}`,
    buyBooster: (boosterId: string) => `/sets/${boosterId}/buy`,
    getBooster: (setCodes: string[]) => `/sets?${new URLSearchParams(setCodes.map(s => ['setCodes', s])).toString()}`,
    promoCode: (promoCode: string) => `/promo_codes/${promoCode}/redeem`
} as const

const token = localStorage.getItem('token')

const requestPayment = (productId: string) => apiRequest({
    url: QUERY_URLS.payment,
    method: 'POST',
    body: { productId },
    token: !!token ? token : undefined
}, responseSendPayementIcToStripeSchema)

const confirmPayement = (sessionId: string) => apiRequest({
    url: QUERY_URLS.confirmPayment(sessionId),
    method: 'PATCH',
    token: !!token ? token : undefined
}, responseConfirmPayementIcToStripeSchema)

const buyBooster = (amount: number, boosterId: string) => apiRequest({
    url: QUERY_URLS.buyBooster(boosterId),
    method: 'POST',
    body: { amount },
    token: !!token ? token : undefined
}, responseBuyBoosterSchema)

const getFirstGenerationBooster = () => apiRequest({
    url: QUERY_URLS.getBooster(BOOSTER_CODE),
    method: 'GET',
    token: !!token ? token : undefined
})

const redeemPromoCode = (promoCode: string) => apiRequest({
    url: QUERY_URLS.promoCode(promoCode),
    method: 'POST',
    token: !!token ? token : undefined
}, responseOnePromoCodeSchema)

export const usePayment = () =>
    useMutation<responseSendPayementIcToStripeSchemaType, Error, string>((productId) => requestPayment(productId))

export const useConfirmPayment = () =>
    useMutation<responseConfirmPayementIcToStripeSchemaType, Error, string>((sessionId) => confirmPayement(sessionId))

export const useBuyBooster = () =>
    useMutation<responseBuyBoosterSchemaType, Error, { amount: number, boosterId: string }>((money) => buyBooster(money.amount, money.boosterId))

export const useGetFirstGenerationBooster = () => {
    const { data, isLoading, error } = useQuery<ApiGetItemResponse<BoosterApiResponse[]>>(['getFirstGenerationBooster'], () => getFirstGenerationBooster(), {})

    return React.useMemo(() => ({ data, isLoading, error }), [data, isLoading, error])
}

export const useRedeemPromoCode = () =>
    useMutation<responseOnePromoCodeSchemaType, Error, string>((promoCode) => redeemPromoCode(promoCode))
