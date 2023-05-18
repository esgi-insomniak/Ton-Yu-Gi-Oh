import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";

const QUERY_URLS = {
  userDecks: (userId: string) => `/users/${userId}/user_decks?_=${Date.now()}`,
  requestPostUserDeck: "/user_decks",
  requestDeleteUserDeck: (userDeckId: string) => `/user_decks/${userDeckId}`,
  requestUserDeck: (userDeckId: string) => `/user_decks/${userDeckId}`,
} as const;

const token = JSON.parse(localStorage.getItem("token") as string);

const requestUserDecks = (userId: string) =>
  apiRequest({
    url: QUERY_URLS.userDecks(userId),
    method: "GET",
    token: !!token ? token : undefined,
  });

const requestDeckUserId = (userDeckId: string) =>
  apiRequest({
    url: QUERY_URLS.requestUserDeck(userDeckId),
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

const requestDeleteUserDeck = (userDeckId: string) =>
  apiRequest({
    url: QUERY_URLS.requestDeleteUserDeck(userDeckId),
    method: "DELETE",
    token: !!token ? token : undefined,
  });

export const useGetAllUserDecks = (userId: string) => {
  const userDecks = useQuery(["userDecks", userId], () =>
    requestUserDecks(userId)
  );

  return userDecks;
};

export const useGetCardDeckUser = (userDeckId: any) => {
  const userCardsDeck = useQuery(["userDecksId", userDeckId], () =>
    requestDeckUserId(userDeckId)
  );

  return userCardsDeck;
};

export const usePostUserDeck = () =>
  useMutation<void, Error, { userCardSetIds: Array<string>; name: string }>(
    (userCardSetIdsAndName) =>
      requestPostUserDeck(
        userCardSetIdsAndName.userCardSetIds,
        userCardSetIdsAndName.name
      )
  );

export const useDeleteUserDeck = () =>
  useMutation<void, Error, string>((userDeckId) =>
    requestDeleteUserDeck(userDeckId)
  );
