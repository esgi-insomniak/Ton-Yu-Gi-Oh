import { apiRequest, getToken } from "@/helpers/api";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { Card, MyCards, MyObj, SameCards } from "@/helpers/types/decks";
import { UserMe } from "@/helpers/types/users";
import { userSchemaType } from "@/helpers/utils/schema/Admin";
import { responseRegisterSchema } from "@/helpers/utils/schema/Auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useHref } from "react-router-dom";

const QUERY_URLS = {
  me: () => `/users/me`,
  userCardSets: (userId: string) => `/users/${userId}/user_card_sets?limit=100`,
  getUsers: (cardSetId: string, itemPerPage?: number, pageNumber?: number) => `/users?limit=${itemPerPage}&offset=${pageNumber}&cardSetId=${cardSetId}`,
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

const requestUserCardSets = (userId: string) =>
  apiRequest({
    url: QUERY_URLS.userCardSets(userId),
    method: "GET",
    token: getToken(),
  });

const requestGetUsers = (cardSetId: string, itemPerPage?: number, pageNumber?: number) =>
  apiRequest({
    url: QUERY_URLS.getUsers(cardSetId, itemPerPage, pageNumber),
    method: "GET",
    token: getToken(),
  });

export const useMe = () => {
  const { data, isLoading, error, refetch } = useQuery<ApiGetItemResponse<userSchemaType>>(userKeys.me(), () => requestMe(), {
    refetchOnReconnect: "always",
    refetchOnWindowFocus: true,
    enabled: !!getToken(),
    retry: 0,
  })

  if (error) { window.location.reload() }

  const me = data?.data

  return React.useMemo(() => ({ me, isLoading, error, refetch }), [data, isLoading, error])
}


export const useGetAllMyUserCardSets = (userId: string) => {
  const myCards = useQuery(["userCardSets", userId], () =>
    requestUserCardSets(userId)
  );

  return myCards;
};

export const useGetUserWithCardSetId = (cardSetId: string, itemPerPage?: number, pageNumber?: number) => {
  const users = useQuery<ApiGetItemResponse<userSchemaType[]>>(["users", cardSetId, itemPerPage, pageNumber], () =>
    requestGetUsers(cardSetId, itemPerPage, pageNumber)
  );

  return React.useMemo(() => ({ users }), [users, cardSetId, itemPerPage, pageNumber]);
};

export const getAllCardInDoubleAndIncrement = (
  myCards: MyCards
): Array<SameCards> => {
  let myObj: MyObj = {};
  Object.values(myCards || {}).forEach((cards: Card[]) => {
    cards.forEach((card: Card) => {
      const cardSetId = card.cardSet.id;
      if (myObj[cardSetId]) {
        myObj[cardSetId].count++;
        myObj[cardSetId].userCardSetIds.push(card.id);
      } else {
        myObj[cardSetId] = {
          item: card,
          count: 1,
          userCardSetIds: [card.id],
        };
      }
    });
  });
  return Object.values(myObj);
};
