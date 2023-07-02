import { useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

import React from "react";
import { archetypeArrayResponseSchema } from "@/helpers/utils/schema/cards/archetype.schema";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { CardIArchetype } from "@/helpers/types/cards";

const QUERY_URLS = {
  archetypes: (pageNumber: number, itemPerPage: number) =>
    `/archetypes?limit=${itemPerPage}&offset=${pageNumber}`,
} as const;

const archetypesKeys = {
  all: ["archetypes"],
  archetypes: (pageNumber: number, itemPerPage: number) => [
    ...archetypesKeys.all,
    pageNumber,
    itemPerPage,
  ],
} as const;

const requestArchetypes = (pageNumber: number, itemPerPage: number) =>
  apiRequest(
    {
      url: QUERY_URLS.archetypes(pageNumber, itemPerPage),
      method: "GET",
    },
    archetypeArrayResponseSchema
  );

export const useGetArchetypes = (pageNumber: number, itemPerPage: number) => {
  const archetypes = useQuery<ApiGetItemResponse<CardIArchetype[]>>(
    archetypesKeys.archetypes(pageNumber, itemPerPage),
    () => requestArchetypes(pageNumber, itemPerPage),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => archetypes, [archetypes]);
};

export const useGetAllArchetypes = () => {
  const archetypes = useQuery<ApiGetItemResponse<CardIArchetype[]>>(
    archetypesKeys.all,
    () => requestArchetypes(0, 1000),
    {
      refetchOnWindowFocus: false,
    }
  );

  return React.useMemo(() => archetypes, [archetypes]);
}
