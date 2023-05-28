import { useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import { cardSetArrayResponseSchema } from "@/helpers/utils/schema/cards/card-set.schema";

import React from "react";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { CardICardSet } from "@/helpers/types/cards";

const QUERY_URLS = {
  cardSets: (pageNumber: number, itemPerPage: number) =>
    `/card_sets?limit=${itemPerPage}&offset=${pageNumber}`,
  getBooster: (id: string) => `/card_sets?setId=${id}&limit=150`,
} as const;

const cardSetsKeys = {
  all: ["cardSets"],
  cardSets: (pageNumber: number, itemPerPage: number) => [
    ...cardSetsKeys.all,
    pageNumber,
    itemPerPage,
  ],
  booster: (id: string) => [...cardSetsKeys.all, id],
} as const;

const requestCardSets = (pageNumber: number, itemPerPage: number) =>
  apiRequest(
    {
      url: QUERY_URLS.cardSets(pageNumber, itemPerPage),
      method: "GET",
    },
    cardSetArrayResponseSchema
  );

export const useGetCardSets = (pageNumber: number, itemPerPage: number) => {
  const arrayOfCards = useQuery<ApiGetItemResponse<CardICardSet[]>>(
    cardSetsKeys.cardSets(pageNumber, itemPerPage),
    () => requestCardSets(pageNumber, itemPerPage),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => arrayOfCards, [arrayOfCards]);
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