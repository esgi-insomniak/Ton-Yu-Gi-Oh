import { useQuery } from 'react-query'
import { apiRequest } from '@/helpers/api'
import { responseCardsSchema } from '@/helpers/utils/schema/cards'
import { ApiResponse } from '@/helpers/types/cards'
import React from 'react'

const QUERY_URLS = {
    cards: (pageNumber: number, itemPerPage: number) => `/cards?limit=${pageNumber}&offset=${itemPerPage}`,
} as const

const cardsKeys = {
    all: ['cards'],
    cards: (pageNumber: number, itemPerPage: number) => [...cardsKeys.all, pageNumber, itemPerPage],
} as const

const requestCards = (pageNumber: number, itemPerPage: number) => apiRequest({
    url: QUERY_URLS.cards(pageNumber, itemPerPage),
    method: 'GET',
}, responseCardsSchema)

export const useGetAllCards = (pageNumber: number, itemPerPage: number) => {
    const arrayOfCards = useQuery<ApiResponse>(cardsKeys.cards(pageNumber, itemPerPage), () => requestCards(pageNumber, itemPerPage))

    return React.useMemo(() => arrayOfCards, [arrayOfCards])
}