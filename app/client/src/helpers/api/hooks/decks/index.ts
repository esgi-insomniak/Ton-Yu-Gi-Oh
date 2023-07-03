import { useMutation, useQuery } from "react-query";
import { apiRequest } from "@/helpers/api";
import React from "react";
import { CardIUserCardSet } from "@/helpers/types/cards";
import { ApiGetItemResponse } from "@/helpers/types/common";
import {
  userCardSetReponseType,
  userCardSetsCompleteType,
  userCardSetsResponseSchema,
  userCardSetsType,
} from "@/helpers/utils/schema/cards/card-set.schema";

const QUERY_URLS = {
  userDecks: (userId: string, limit: number, offset: number) =>
    `/users/${userId}/user_decks?limit=${limit}&offset=${offset}`,
  requestPostUserDeck: "/user_decks",
  requestDeleteUserDeck: (userDeckId: string) => `/user_decks/${userDeckId}`,
  requestUserDeck: (userDeckId: string) => `/user_decks/${userDeckId}`,
} as const;

const token = localStorage.getItem("token");

const requestUserDecks = (userId: string, limit: number, offset: number) =>
  apiRequest({
    url: QUERY_URLS.userDecks(userId, limit, offset),
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

const requestPatchUserDeck = (
  userDeckId: string,
  userCardSetIds: Array<string>,
  name: string
) =>
  apiRequest({
    url: QUERY_URLS.requestUserDeck(userDeckId),
    method: "PATCH",
    body: { userCardSetIds, name },
    token: !!token ? token : undefined,
  });

const requestDeleteUserDeck = (userDeckId: string) =>
  apiRequest({
    url: QUERY_URLS.requestDeleteUserDeck(userDeckId),
    method: "DELETE",
    token: !!token ? token : undefined,
  });

export const useGetAllUserDecks = (
  userId: string,
  limit: number,
  offset: number
) => {
  const userDecks = useQuery<userCardSetReponseType>(
    ["userDecks", userId, limit, offset],
    () => requestUserDecks(userId, limit, offset)
  );

  return userDecks;
};

export const useGetUserDeckById = (userDeckId: string) => {
  const userDeck = useQuery<ApiGetItemResponse<userCardSetsCompleteType>>(
    ["userDeck", userDeckId],
    () => requestDeckUserId(userDeckId),
    {
      retry: false,
    }
  );

  return userDeck;
};

export const useGetCardDeckUser = () => {
  const [userDeckId, setUserDeckId] = React.useState<string>("");

  const userCardsDeck = useQuery<userCardSetsType>(
    ["userDecksId", userDeckId],
    () => requestDeckUserId(userDeckId),
    {
      refetchOnWindowFocus: false,
      enabled: !!userDeckId,
    }
  );

  return React.useMemo(
    () => ({ userCardsDeck, setUserDeckId }),
    [userCardsDeck, setUserDeckId]
  );
};

export const usePostUserDeck = () =>
  useMutation<void, Error, { userCardSetIds: Array<string>; name: string }>(
    (userCardSetIdsAndName) =>
      requestPostUserDeck(
        userCardSetIdsAndName.userCardSetIds,
        userCardSetIdsAndName.name
      )
  );

export const usePatchUserDeck = () =>
  useMutation<
    void,
    Error,
    { userDeckId: string; userCardSetIds: Array<string>; name: string }
  >((userCardSetIdsAndName) =>
    requestPatchUserDeck(
      userCardSetIdsAndName.userDeckId,
      userCardSetIdsAndName.userCardSetIds,
      userCardSetIdsAndName.name
    )
  );

export const useDeleteUserDeck = () =>
  useMutation<void, Error, string>((userDeckId) =>
    requestDeleteUserDeck(userDeckId)
  );
