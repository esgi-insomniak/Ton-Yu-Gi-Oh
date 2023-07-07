import { useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

import React from "react";
import { ApiGetItemResponse } from "@/helpers/types/common";
import {
  exchangeOneResponseSchema,
  exchangeType,
} from "@/helpers/utils/schema/exchange";
import { IAuction, IAuctionHistory } from "@/helpers/types/auction";

const QUERY_URLS = {
  getExchangeById: (id: string) => `/exchanges/${id}`,
  getActiveAuction: () => `/auction`,
  getAuctionHistory: (id: string) => `/auction/${id}/auction_history`,
} as const;

const token = localStorage.getItem("token");

const exchangesKeys = {
  all: ["exchanges"],
  getAuction: ["auction"],
  getAuctionHistory: (id: string) => ["auction_history", id],
} as const;

const requestExchangeById = (id: string) =>
  apiRequest(
    {
      url: QUERY_URLS.getExchangeById(id),
      method: "GET",
      token: !!token ? token : undefined,
    },
    exchangeOneResponseSchema
  );

const requestGetActiveAuction = () =>
  apiRequest({
    url: QUERY_URLS.getActiveAuction(),
    method: "GET",
    token: !!token ? token : undefined,
  });

const requestGetAuctionHistory = (id: string) =>
  apiRequest({
    url: QUERY_URLS.getAuctionHistory(id),
    method: "GET",
    token: !!token ? token : undefined,
  });

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
};

export const useGetActiveAuction = () => {
  const { data, isLoading, isError } = useQuery<ApiGetItemResponse<IAuction>>(
    exchangesKeys.getAuction,
    () => requestGetActiveAuction(),
    {
      retry: false,
      refetchOnWindowFocus: true,
    }
  );

  return React.useMemo(() => ({ data, isLoading, isError }), [data, isError]);
};

export const useGetAuctionHistory = (id: string) => {
  const { data, isLoading, isError } = useQuery< ApiGetItemResponse<IAuctionHistory[]>>(exchangesKeys.getAuctionHistory(id), () => requestGetAuctionHistory(id), {
    refetchOnWindowFocus: false,
  });

  return React.useMemo(() => ({ data, isLoading, isError }), [data, isError]);
};
