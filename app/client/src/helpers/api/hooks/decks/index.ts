import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

const QUERY_URLS = {
  userDecks: (userId: string) => `/users/${userId}/user_decks?_=${Date.now()}`,
  requestPostUserDeck: "/user_decks",
} as const;

const token = JSON.parse(localStorage.getItem("token") as string);

const requestUserDecks = (userId: string) =>
  apiRequest({
    url: QUERY_URLS.userDecks(userId),
    method: "GET",
    token: !!token ? token : undefined,
  });

const requestPostUserDeck = (userCardSetIds: Array<string>, name: string) =>
  apiRequest({
    url: QUERY_URLS.requestPostUserDeck,
    method: "POST",
    body: { userCardSetIds, name },
    token: !!token ? token : undefined,
  });

export const useGetAllUserDecks = (userId: string) => {
  const userDecks = useQuery(["userDecks", userId], () =>
    requestUserDecks(userId)
  );

  return userDecks;
};

export const usePostUserDeck = () => 
  useMutation<void, Error, { userCardSetIds: Array<string>, name: string }>((userCardSetIdsAndName) => requestPostUserDeck(userCardSetIdsAndName.userCardSetIds, userCardSetIdsAndName.name))
