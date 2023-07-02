import { apiRequest, getToken } from "@/helpers/api";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { Card, MyCards, MyObj, SameCards } from "@/helpers/types/decks";
import { UserMe } from "@/helpers/types/users";
import { userSchemaType } from "@/helpers/utils/schema/Admin";
import { responseRegisterSchema } from "@/helpers/utils/schema/Auth";
import { groupedUserCardSetPartialResponseSchema, groupedUserCardSetType } from "@/helpers/utils/schema/User";
import { arrayOfCardSetsSchemaType } from "@/helpers/utils/schema/cards/card-set.schema";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URLS = {
  me: () => `/users/me`,
  userCardSets: (limit: number, pageNumber: number) => `/users/me/user_card_sets?limit=${limit}&offset=${pageNumber}`,
  getUsers: (cardSetId: string, itemPerPage?: number, pageNumber?: number) => `/users?limit=${itemPerPage}&offset=${pageNumber}&cardSetId=${cardSetId}`,
  groupedUserCardSets: (limit: number, pageNumber: number) => `/users/me/grouped_user_card_sets?limit=${limit}&offset=${pageNumber}`,
} as const;

const userKeys = {
  all: ["me"],
  me: () => [...userKeys.all, "user"],
} as const;
const requestMe = () =>
  apiRequest(
    {
      url: QUERY_URLS.me(),
      method: "GET",
      token: getToken(),
    },
    responseRegisterSchema
  );

const requestUserCardSets = (limit: number, pageNumber: number) =>
  apiRequest({
    url: QUERY_URLS.userCardSets(limit, pageNumber),
    method: "GET",
    token: getToken(),
  });

const requestGetUsers = (cardSetId: string, itemPerPage?: number, pageNumber?: number) =>
  apiRequest({
    url: QUERY_URLS.getUsers(cardSetId, itemPerPage, pageNumber),
    method: "GET",
    token: getToken(),
  });

const requestGroupeUserCardSets = (limit: number, pageNumber: number) =>
  apiRequest({
    url: QUERY_URLS.groupedUserCardSets(limit, pageNumber),
    method: "GET",
    token: getToken(),
  }, groupedUserCardSetPartialResponseSchema);

export const useMe = () => {
  const { data, isLoading, error, refetch } = useQuery<ApiGetItemResponse<userSchemaType>>(userKeys.me(), () => requestMe(), {
    refetchOnReconnect: "always",
    refetchOnWindowFocus: true,
    enabled: !!getToken(),
    retry: 0,
  })

  if (error) {
    localStorage.removeItem("token")
    window.location.reload()
  }

  const me = data?.data

  return React.useMemo(() => ({ me, isLoading, error, refetch }), [data, isLoading, error])
}


export const useGetAllMyUserCardSets = (limit: number, pageNumber: number) => {
  const { data, isLoading } = useQuery<ApiGetItemResponse<arrayOfCardSetsSchemaType[]>>(["userCardSets", limit, pageNumber], () =>
    requestUserCardSets(limit, pageNumber)
  );

  return React.useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

export const useGetUserWithCardSetId = (cardSetId: string, itemPerPage?: number, pageNumber?: number) => {
  const users = useQuery<ApiGetItemResponse<userSchemaType[]>>(["users", cardSetId, itemPerPage, pageNumber], () =>
    requestGetUsers(cardSetId, itemPerPage, pageNumber)
  );

  return React.useMemo(() => ({ users }), [users, cardSetId, itemPerPage, pageNumber]);
};

export const useGetAllMyGroupedUserCardSets = (limit: number, pageNumber: number) => {
  const { data, isLoading } = useQuery<ApiGetItemResponse<groupedUserCardSetType[]>>(["groupedUserCardSets", limit, pageNumber], () =>
    requestGroupeUserCardSets(limit, pageNumber)
  );

  return React.useMemo(() => ({ data, isLoading }), [data, isLoading]);
}