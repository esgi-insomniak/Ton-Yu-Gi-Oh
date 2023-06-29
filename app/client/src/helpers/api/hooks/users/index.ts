import { apiRequest } from "@/helpers/api";
import { ApiGetItemResponse } from "@/helpers/types/common";
import { Card, MyCards, MyObj, SameCards } from "@/helpers/types/decks";
import { UserMe } from "@/helpers/types/users";
import { userSchemaType } from "@/helpers/utils/schema/Admin";
import { responseRegisterSchema } from "@/helpers/utils/schema/Auth";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URLS = {
  me: (id: string) => `/users/${id}`,
  userCardSets: (userId: string) => `/users/${userId}/user_card_sets?limit=100`,
  getUsers: (cardSetId: string, itemPerPage?: number, pageNumber?: number) => `/users?limit=${itemPerPage}&offset=${pageNumber}&cardSetId=${cardSetId}`,
} as const;

const userKeys = {
  all: ["me"],
  me: (id: string, token: string) => [...userKeys.all, id, token],
} as const;

const token = localStorage.getItem("token") || "";

const requestMe = (id: string) =>
  apiRequest(
    {
      url: QUERY_URLS.me(id),
      method: "GET",
      token: !!token ? token : undefined,
    },
    responseRegisterSchema
  );

const requestUserCardSets = (userId: string) =>
  apiRequest({
    url: QUERY_URLS.userCardSets(userId),
    method: "GET",
    token: !!token ? token : undefined,
  });

const requestGetUsers = (cardSetId: string, itemPerPage?: number, pageNumber?: number) =>
  apiRequest({
    url: QUERY_URLS.getUsers(cardSetId, itemPerPage, pageNumber),
    method: "GET",
    token: !!token ? token : undefined,
  });

export const useMe = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery<UserMe>(userKeys.me(id, token), () => requestMe(id), {
    enabled: !!id,
    refetchOnReconnect: "always",
    refetchOnWindowFocus: true,
  })

  return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
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
