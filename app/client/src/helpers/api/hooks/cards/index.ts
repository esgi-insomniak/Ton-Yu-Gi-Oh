import { useQuery } from 'react-query'
import { apiRequest } from '@/helpers/api'
import { cardSetArrayResponseSchema } from '@/helpers/utils/schema/cards/card-set.schema'

import React from 'react'
import { ApiResponseCardSet } from '@/helpers/types/cards'

const QUERY_URLS = {
    cards: (pageNumber: number, itemPerPage: number) => `/card_sets?limit=${itemPerPage}&offset=${pageNumber}`,
} as const

const cardsKeys = {
    all: ['cards'],
    cards: (pageNumber: number, itemPerPage: number) => [...cardsKeys.all, pageNumber, itemPerPage],
} as const

const requestCards = (pageNumber: number, itemPerPage: number) => apiRequest({
    url: QUERY_URLS.cards(pageNumber, itemPerPage),
    method: 'GET',
}, cardSetArrayResponseSchema)

export const useGetAllCards = (pageNumber: number, itemPerPage: number) => {
    const arrayOfCards = useQuery<ApiResponseCardSet>(cardsKeys.cards(pageNumber, itemPerPage), () => requestCards(pageNumber, itemPerPage), {
        refetchOnWindowFocus: false,
    })

    return React.useMemo(() => arrayOfCards, [arrayOfCards])
}