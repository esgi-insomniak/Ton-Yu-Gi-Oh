import { useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

import React from "react";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { attributeArrayResponseSchema } from "@/helpers/utils/schema/cards/attribute.schema";
import { CardIAttribute } from "@/helpers/types/cards";
import { RarityI, rarityArrayResponseSchema } from "@/helpers/utils/schema/cards/rarity.schema";

const QUERY_URLS = {
  attributes: (pageNumber: number, itemPerPage: number) =>
    `/attributes?limit=${itemPerPage}&offset=${pageNumber}`,
  rarities: (pageNumber: number, itemPerPage: number) =>
    `/rarities?limit=${itemPerPage}&offset=${pageNumber}`,
  archetypes: (pageNumber: number, itemPerPage: number) =>
    `/archetypes?limit=${itemPerPage}&offset=${pageNumber}`,
} as const;

const attributesKeys = {
  all: ["attributes"],
  attributes: (pageNumber: number, itemPerPage: number) => [
    ...attributesKeys.all,
    pageNumber,
    itemPerPage,
  ],
  rarities: (pageNumber: number, itemPerPage: number) => [
    ...attributesKeys.all,
    pageNumber,
    itemPerPage,
  ],
  archetypes: (pageNumber: number, itemPerPage: number) => [
    ...attributesKeys.all,
    pageNumber,
    itemPerPage,
  ],
} as const;

const requestAttributes = (pageNumber: number, itemPerPage: number) =>
  apiRequest(
    {
      url: QUERY_URLS.attributes(pageNumber, itemPerPage),
      method: "GET",
    },
    attributeArrayResponseSchema
  );

export const useGetAttributes = (pageNumber: number, itemPerPage: number) => {
  const attributes = useQuery<ApiGetItemResponse<CardIAttribute[]>>(
    attributesKeys.attributes(pageNumber, itemPerPage),
    () => requestAttributes(pageNumber, itemPerPage),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => attributes, [attributes]);
};

export const useGetAllAttributes = () => {
  const attributes = useQuery<ApiGetItemResponse<CardIAttribute[]>>(
    attributesKeys.all,
    () => requestAttributes(0, 1000),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => attributes, [attributes]);
};

export const useGetAllRarities = () => {
  const rarities = useQuery<ApiGetItemResponse<RarityI[]>>(
    attributesKeys.rarities(0, 1000),
    () => apiRequest({ url: QUERY_URLS.rarities(0, 1000), method: "GET" }, rarityArrayResponseSchema),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => rarities, [rarities]);
}