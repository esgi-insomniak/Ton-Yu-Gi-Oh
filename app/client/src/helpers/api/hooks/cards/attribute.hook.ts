import { useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

import React from "react";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { attributeArrayResponseSchema } from "@/helpers/utils/schema/cards/attribute.schema";
import { CardIAttribute } from "@/helpers/types/cards";

const QUERY_URLS = {
  attributes: (pageNumber: number, itemPerPage: number) =>
    `/attributes?limit=${itemPerPage}&offset=${pageNumber}`,
} as const;

const attributesKeys = {
  all: ["attributes"],
  attributes: (pageNumber: number, itemPerPage: number) => [
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
