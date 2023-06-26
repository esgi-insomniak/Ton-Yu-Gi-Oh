import { apiRequest } from "@/helpers/api";
import { Card, MyCards, MyObj, SameCards } from "@/helpers/types/decks";
import { UserMe } from "@/helpers/types/users";
import { responseRegisterSchema } from "@/helpers/utils/schema/Auth";
import React from "react";
import { useQuery } from "react-query";

const QUERY_URLS = {
  me: (id: string) => `/users/${id}`,
  userCardSets: (userId: string) => `/users/${userId}/user_card_sets?limit=100`,
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

export const useMe = (id: string) => {
    const { data, isLoading, error, refetch } = useQuery<UserMe>(userKeys.me(id, token), () => requestMe(id), {
        enabled: !!id,
        refetchOnReconnect: "always",
        refetchOnWindowFocus: false,
    })

    return React.useMemo(() => ({ data, isLoading, error, refetch }), [data, isLoading, error])
}

const requestUserCardSets = (userId: string) =>
  apiRequest({
    url: QUERY_URLS.userCardSets(userId),
    method: "GET",
    token: !!token ? token : undefined,
  });

export const useGetAllMyUserCardSets = (userId: string) => {
  const myCards = useQuery(["userCardSets", userId], () =>
    requestUserCardSets(userId)
  );

  return myCards;
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
