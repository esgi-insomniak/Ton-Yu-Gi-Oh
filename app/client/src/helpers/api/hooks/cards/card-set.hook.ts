import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import { cardSetArrayResponseSchema, cardSetOneResponseSchema, cardSetSchema } from "@/helpers/utils/schema/cards/card-set.schema";

import React from "react";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { CardICardSet, CardIUserCardSet } from "@/helpers/types/cards";

const QUERY_URLS = {
  cardSets: (pageNumber: number, itemPerPage: number, attributeId?: string, rarityId?: string, archetypeId?: string, cardName?: string) =>
    `/card_sets?limit=${itemPerPage}&offset=${pageNumber}${attributeId && `&attributeId=${attributeId}`}${rarityId && `&rarityId=${rarityId}`}${archetypeId && `&archetypeId=${archetypeId}`}${cardName && `&cardName=${cardName}`}`,
  getBooster: (id: string) => `/card_sets?setId=${id}&limit=150`,
  getUserCardSets: (pageNumber: number, itemPerPage: number) => `/users/me/user_card_sets?limit=${itemPerPage}&offset=${pageNumber}`,
  scrapCards: () => `/user_card_sets/scrap`,
  getCardById: (id: string) => `/card_sets/${id}`,
} as const;

const token = localStorage.getItem("token");

const cardSetsKeys = {
  all: ["cardSets"],
  cardSets: (pageNumber: number, itemPerPage: number, attributeId?: string, rarityId?: string, archetypeId?: string, cardName?: string) => [
    ...cardSetsKeys.all,
    pageNumber,
    itemPerPage,
    attributeId,
    rarityId,
    archetypeId,
    cardName,
  ],
  booster: (id: string) => [...cardSetsKeys.all, id],
  getUserCardSets: () => [...cardSetsKeys.all, 'me'],
  scrapCards: (arrayOfIds: string[]) => [...cardSetsKeys.all, arrayOfIds],
} as const;

const requestCardSets = (pageNumber: number, itemPerPage: number, attributeId?: string, rarityId?: string, archetypeId?: string, cardName?: string) =>
  apiRequest(
    {
      url: QUERY_URLS.cardSets(pageNumber, itemPerPage, attributeId, rarityId, archetypeId, cardName),
      method: "GET",
    },
    cardSetArrayResponseSchema
  );

const requestUserCardSets = (pageNumber: number, itemPerPage: number) =>
  apiRequest({
    url: QUERY_URLS.getUserCardSets(pageNumber, itemPerPage),
    method: "GET",
    token: !!token ? token : undefined
  });

const requestScrapCards = (arrayOfIds: string[]) =>
  apiRequest({
    url: QUERY_URLS.scrapCards(),
    method: "DELETE",
    body: { userCardSetIds: arrayOfIds },
    token: !!token ? token : undefined
  });

const requestCardById = (id: string) =>
  apiRequest({
    url: QUERY_URLS.getCardById(id),
    method: "GET",
    token: !!token ? token : undefined
  }, cardSetOneResponseSchema);

export const useGetCardSets = (pageNumber: number, itemPerPage: number, attributeId?: string, rarityId?: string, archetypeId?: string, cardName?: string) => {
  const arrayOfCards = useQuery<ApiGetItemResponse<CardICardSet[]>>(
    cardSetsKeys.cardSets(pageNumber, itemPerPage, attributeId, rarityId, archetypeId, cardName),
    () => requestCardSets(pageNumber, itemPerPage, attributeId, rarityId, archetypeId, cardName),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => arrayOfCards, [arrayOfCards, attributeId, rarityId, archetypeId, cardName]);
};

export const useGetUserCardSets = (pageNumber: number, itemPerPage: number, attributeId?: string, rarityId?: string, archetypeId?: string, cardName?: string) => {
  const arrayOfCards = useQuery<ApiGetItemResponse<CardIUserCardSet[]>>(
    cardSetsKeys.getUserCardSets(),
    () => requestUserCardSets(pageNumber, itemPerPage),
    { refetchOnWindowFocus: false }
  );

  return React.useMemo(() => arrayOfCards, [arrayOfCards, attributeId, rarityId, archetypeId, cardName, pageNumber, itemPerPage]);
};


export const useGetBoosterById = () => {
  const [id, setId] = React.useState<string>("");
  const booster = useQuery<ApiGetItemResponse<CardICardSet[]>>(
    cardSetsKeys.booster(id),
    () => apiRequest({ url: QUERY_URLS.getBooster(id), method: "GET" }),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return React.useMemo(() => ({ booster, setId }), [booster, setId]);
}

export const useScrapCards = () => useMutation((arrayOfIds: string[]) => requestScrapCards(arrayOfIds));

export const useGetCardById = (id: string) => {
  const { data, isLoading } = useQuery<ApiGetItemResponse<CardICardSet>>(
    cardSetsKeys.booster(id),
    () => requestCardById(id),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return React.useMemo(() => ({ data, isLoading }), [data, id]);
}