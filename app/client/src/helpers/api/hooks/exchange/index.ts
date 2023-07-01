import { useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

import React from "react";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { exchangeOneResponseSchema, exchangeType } from "@/helpers/utils/schema/exchange";

const QUERY_URLS = {
  getExchangeById: (id: string) => `/exchanges/${id}`,
} as const;

const token = localStorage.getItem("token");

const exchangesKeys = {
  all: ['exchanges'],
} as const;

const requestExchangeById = (id: string) =>
  apiRequest({
    url: QUERY_URLS.getExchangeById(id),
    method: "GET",
    token: !!token ? token : undefined
  }, exchangeOneResponseSchema);

export const useGetExchangeById = (id: string) => {
  const { data, isLoading } = useQuery<ApiGetItemResponse<exchangeType>>(
    exchangesKeys.all,
    () => requestExchangeById(id),
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return React.useMemo(() => ({ data, isLoading }), [data, id]);
}