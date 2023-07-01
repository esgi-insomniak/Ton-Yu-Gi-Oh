import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import React from "react";

const QUERY_URLS = {
  userDecks: (userId: string) => `/users/${userId}/user_decks?_=${Date.now()}`,
  requestPostUserDeck: "/user_decks",
  requestDeleteUserDeck: (userDeckId: string) => `/user_decks/${userDeckId}`,
  requestUserDeck: (userDeckId: string) => `/user_decks/${userDeckId}`,
} as const;

const token = localStorage.getItem('token')

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

export const useGetCardDeckUser = () => {
  const [userDeckId, setUserDeckId] = React.useState<string>("");

  const userCardsDeck = useQuery(
    ["userDecksId", userDeckId],
    () => requestDeckUserId(userDeckId),
    {
      refetchOnWindowFocus: false,
      enabled: !!userDeckId,
    }
  );

  return React.useMemo(() => ({ userCardsDeck, setUserDeckId }), [
    userCardsDeck,
    setUserDeckId,
  ]);
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
